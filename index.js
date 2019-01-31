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
            name: `${dbData.rows[0].first} ${dbData.rows[0].last}`
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
    const email = req.session.email;
    db.getUserInfo(email).then(dbData => {
        res.json(dbData.rows);
    });
});
// ----------------------------------

// ------------------------------------
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
