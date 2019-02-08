const express = require("express");
const app = express();
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
app.use(
    cookieSession({
        secret: `I'm always angry.` /* nur irgendein text */,
        maxAge: 1000 * 60 * 60 * 24 * 14 /* two weeks */
    })
);
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
    console.log("Req.body post register", req.body);
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
                console.log("User really has been added to Database");
                console.log("Returnend dbData: ", dbData.rows[0]);
                req.session.userId = dbData.rows[0].id;
                req.session.name = `${dbData.rows[0].first} ${
                    dbData.rows[0].last
                }`;
                console.log("req.session :", req.session);
                res.json({
                    success: true
                });
            })
            .catch(err => {
                console.log(err);
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
                console.log("Error app.post/login: ", err);
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
            console.log("err in post upload:", err);
        });
});

// ADD PROFILE PIC
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const fullUrl = config.s3Url + req.file.filename;
    const userId = req.session.userId;
    db.addProfilePic(fullUrl, userId)
        .then(({ rows }) => {
            console.log("Rows in app post uploade: ", rows);
            res.json(rows[0]);
        })
        .catch(err => {
            console.log("err in post upload:", err);
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
            console.log("Err in get /userbio: ", err);
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
            console.log("Err in post/userbio: ", err);
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
        .then(data => {
            // console.log("Get Other User:", data);
            const OtherUserInfo = data.rows[0];
            res.json(OtherUserInfo);
        })
        .catch(err => {
            console.log("Err in get/user/id/info: ", err);
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
            // No Request send yet
            if (!dbData.rows[0]) {
                res.json({
                    buttonText: "Make Friend Request"
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
                        buttonText: "Cancel Friend Request"
                    });
                } else if (loggedInUserId == dbData.rows[0].receiver_id) {
                    res.json({
                        buttonText: "Accept Friend Request"
                    });
                }
            }
        })
        .catch(err => {
            console.log("Err in gettin Initial Status: ", err);
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
    console.log("Cancel Friend Running!");
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
        console.log("Am I htere???", data);
        res.json(data);
    });
});

// SHOW FRIENDS AND PENDING FRIENDS REQUESTS
app.get("/friends-and-wannabes", (req, res) => {
    const userId = req.session.userId;
    db.getFriendsAndWannabes(userId).then(data => {
        // console.log("Data from wholeFriendlist", data);
        res.json({
            friends: data.rows
        });
    });
});

//LOGOUT
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
});

// 2 below should come last

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

//SERVER
app.listen(8080, function() {
    ca.rainbow("Yo, I'm listening on Port 8080!");
});
