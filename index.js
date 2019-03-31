const express = require("express");
const app = express();
//SOCKET
const server = require("http").Server(app);
// change origins if I want to put Social Network online
const io = require("socket.io")(server, { origins: "localhost:8080" });

const compression = require("compression");
const bodyParser = require("body-parser");
const ca = require("chalk-animation");
const cookieSession = require("cookie-session");
const db = require("./db");
const multer = require("multer");
const path = require("path");
const uidSafe = require("uid-safe");
const csurf = require("csurf");
const bcrypt = require("./bcrypt.js");
const s3 = require("./s3");
const config = require("./config");

app.use(compression());
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(bodyParser.json());
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.static("./public"));
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// ROUTES    ######################################################

//WELCOME REGISTER
app.post("/welcome/register", function(req, res) {
    if (
        !req.body.first ||
        !req.body.last ||
        !req.body.email ||
        !req.body.password
    ) {
        res.json({
            success: false
        });
    } else {
        bcrypt
            .hash(req.body.password)
            .then(hashedPass => {
                return db.registerUser(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hashedPass
                );
            })
            .then(dbData => {
                console.log("User has been added to Database");
                req.session.userId = dbData.rows[0].id;
                req.session.name = `${dbData.rows[0].first} ${
                    dbData.rows[0].last
                }`;
                res.json({
                    success: true
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    }
});

//WELCOME LOGIN
app.post("/welcome/login", function(req, res) {
    const email = req.body.email;

    db.getUserByEmail(email).then(dbData => {
        req.session = {
            userId: dbData.rows[0].id,
            first: dbData.rows[0].first,
            last: dbData.rows[0].last
        };
        // CHECK PASSWORD
        return bcrypt
            .comparePassword(req.body.password, dbData.rows[0].hashedpass)
            .then(bool => {
                if (bool) {
                    res.json({
                        success: true
                    });
                } else {
                    req.session = null;
                    res.json({
                        success: false
                    });
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    });
});

// GET USERS PROFILE INFO
app.get("/user", (req, res) => {
    const id = req.session.userId;
    db.getUserInfo(id)
        .then(dbData => {
            res.json(dbData.rows);
        })
        .catch(err => {
            console.log(err.message);
        });
});

// ADD PROFILE PIC
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const fullUrl = config.s3Url + req.file.filename;
    const userId = req.session.userId;

    db.addProfilePic(fullUrl, userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch(err => {
            console.log(err.message);
        });
});

// GET USER BIO
app.get("/userbio", (req, res) => {
    const id = req.session.userId;

    db.getUserBio(id)
        .then(dbData => {
            const savedBio = dbData.rows[0].bio;
            res.json(savedBio);
        })
        .catch(err => {
            console.log(err.message);
        });
});

// SAVE USER BIO
app.post("/userbio", (req, res) => {
    const bio = req.body.bio;
    const id = req.session.userId;

    db.addUserBio(bio, id)
        .then(dbData => {
            const updatedBio = dbData.rows[0].bio;
            res.json(updatedBio);
        })
        .catch(err => {
            console.log(err.message);
        });
});

// SHOW OTHER USER PROFILE
app.get("/user/:id/info", (req, res) => {
    const userId = req.session.userId;
    const targetId = req.params.id;

    if (userId == targetId) {
        return res.json({
            redirectTo: "/"
        });
    }
    db.getOtherUserInfo(targetId)
        .then(dbData => {
            const OtherUserInfo = dbData.rows[0];
            res.json(OtherUserInfo);
        })
        .catch(err => {
            console.log(err.message);
            res.json({
                redirectTo: "/"
            });
        });
});

// GET FRIENDSHIP STATUS
app.get("/get-initial-status/:id", (req, res) => {
    const loggedInUserId = req.session.userId;
    const otherUserId = req.params.id;

    db.getFriendshipStatus(loggedInUserId, otherUserId)
        .then(dbData => {
            // No Request sent yet
            if (!dbData.rows[0]) {
                res.json({
                    buttonText: "Add"
                });
                return;
            }
            // Friend Request Accepted
            if (dbData.rows[0].accepted == true) {
                res.json({
                    buttonText: "Unfriend"
                });
            }
            // Friend Request sent , but not accepted yet
            if (dbData.rows[0].accepted == false) {
                if (loggedInUserId == dbData.rows[0].sender_id) {
                    res.json({
                        buttonText: "Cancel"
                    });
                } else if (loggedInUserId == dbData.rows[0].receiver_id) {
                    res.json({
                        buttonText: "Accept"
                    });
                }
            }
        })
        .catch(err => {
            console.log(err.message);
        });
});

// SEND FRIEND REQUEST
app.post("/send-friend-request/:id", (req, res) => {
    const loggedInUserId = req.session.userId;
    const otherUserId = req.params.id;

    db.createFriendship(loggedInUserId, otherUserId);
});

// CANCEL FRIEND REQUEST
app.post("/cancel-friend-request/:id", (req, res) => {
    const loggedInUserId = req.session.userId;
    const otherUserId = req.params.id;

    db.endFriendship(loggedInUserId, otherUserId).then(data => {
        res.json({
            success: true
        });
    });
});

// ACCEPT FRIEND REQUEST
app.post("/accept-friend-request/:id", (req, res) => {
    const loggedInUserId = req.session.userId;
    const otherUserId = req.params.id;

    db.acceptFriendship(loggedInUserId, otherUserId).then(data => {
        res.json({
            success: true
        });
    });
});

// SHOW FRIENDS AND PENDING(Wannabes) FRIENDS REQUESTS
app.get("/friends-and-wannabes", (req, res) => {
    const userId = req.session.userId;

    db.getFriendsAndWannabes(userId).then(dbData => {
        res.json({
            friends: dbData.rows
        });
    });
});

// GET ALL USERS
app.get("/allmembers", (req, res) => {
    const userId = req.session.userId;

    db.getAllUsers().then(dbData => {
        filteredList = dbData.rows.filter(member => member.id != userId);
        res.json({
            allUsers: filteredList
        });
    });
});

//LOGOUT
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
});

// 2 BELOW SHOULD COME LAST

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//SERVER (with socket.io)
server.listen(8080, function() {
    ca.rainbow("Yo, I'm listening on Port 8080!");
});
// --------------------------------/ socket.io CODE / --------------------------------

//tracks whos CURRENTLY ONLINE
let onlineUsers = {};

io.on("connection", function(socket) {
    if (!socket.request.session || !socket.request.session.userId) {
        return socket.disconnect(true);
    }
    // ---------- LOGS TO SEE WHATS GOING ON  ---------------------
    // console.log(`socket with the id ${socket.id} is now connected`);

    // ------------------------------------------------------------

    const socketId = socket.id;
    const userId = socket.request.session.userId;
    // --------------------- LOGS TO SEE WHATS GOING ON -----------------------------
    onlineUsers[socket.id] = userId;
    // console.log("onlineUsers: ", onlineUsers);
    // console.log("onlineUsers[socket.id]: ", onlineUsers[socket.id]);
    // -------------------------------------------------------------------------------
    let userIds = Object.values(onlineUsers);

    // -------------------------- / SOCKET EVENTS / ------------------------------------------

    db.getUsersByIds(userIds)
        .then(dbData => {
            filteredRows = dbData.rows.filter(
                singleObject => singleObject.id != userId
            );

            socket.emit("onlineUsers", filteredRows);
        })
        .catch(err => {
            console.log(err.message);
        });

    //USER JOINS
    if (userIds.filter(id => id == userId).length == 1) {
        db.getJoinedUser(userId)
            .then(dbData => {
                socket.broadcast.emit("userJoined", dbData.rows[0]);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    // USER LEAVES
    socket.on("disconnect", function() {
        let userWhoLeft = onlineUsers[socket.id];
        delete onlineUsers[socketId];
        io.sockets.emit("userLeft", {
            id: userWhoLeft
        });
    });

    // USER CHAT MESSAGES
    db.getMessages()
        .then(dbData => {
            socket.emit("allMessages", {
                messages: dbData.rows.reverse()
            });
        })
        .catch(err => {
            console.log(err.message);
        });

    // RECEIVES A CHAT MESSAGE FROM A SINGLE CIENT
    socket.on("singleMessage", function(message) {
        db.insertMessage(message.message, userId)
            .then(dbData => {
                dbData.rows[0].first = message.first;
                dbData.rows[0].last = message.last;
                dbData.rows[0].url = message.pic;
                console.log("Added ALL to DataROws: ", dbData.rows[0]);
                io.emit("chatMessage", {
                    message: dbData.rows[0]
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    });
}); //closes io.on 'connection'
