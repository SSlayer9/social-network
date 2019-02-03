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

app.get("/user", (req, res) => {
    console.log("app.getUSER req.session:", req.session);
    const id = req.session.userId;
    db.getUserInfo(id)
        .then(dbData => {
            res.json(dbData.rows);
        })
        .catch(err => {
            console.log("err in post upload:", err);
        });
});

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

app.get("/userbio", (req, res) => {
    const id = req.session.userId;
    db.getUserBio(id).then(data => {
        const savedBio = data.rows[0].bio;
        res.json(savedBio);
    });
});

app.post("/userbio", (req, res) => {
    const bio = req.body.bio;
    const id = req.session.userId;

    db.addUserBio(bio, id).then(data => {
        const updatedBio = data.rows[0].bio;
        res.json(updatedBio);
    });
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

app.listen(8080, function() {
    ca.rainbow("Yo, I'm listening on Port 8080!");
});
