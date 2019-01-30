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
const csrf = app.use(compression());
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
app.use.app.use(express.static("./public"));

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
app.post("register", function(first, last, email, password) {
    bcrypt
        .hash(req.body.password)
        .then(hashedPass => {
            return db.registerUser(
                req.body.first,
                req.body.last,
                req.body.email,
                reg.body.hashedPass
            );
        })
        .then(dbData => {
            (req.session.userId = dbData.rows[0].id),
                (req.session.name = `${dbData.rows[0].first} ${
                    dbData.rows[0].last
                }`);
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        });
});
//----------------------------------------

//---------------------------------------------------
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
