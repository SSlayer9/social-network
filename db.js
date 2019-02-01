let spicedPg = require("spiced-pg");
let db;
// if (true) then website shoult talk to herokus database.
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // if we are on 8080
    const { dbUser, dbPass } = require("./secrets");
    db = spicedPg(`posrgres:${dbUser}:${dbPass}@localhost:5432/social`);
}

// USER REGISTRATION
module.exports.registerUser = (first, last, email, hashedPass) => {
    return db.query(
        `INSERT INTO users (first, last, email, hashedpass) VALUES ($1, $2, $3, $4) RETURNING id, first, last`,
        [first, last, email, hashedPass]
    );
};

//USER LOGIN
module.exports.getUserByEmail = email => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

//GET USER INFO
module.exports.getUserInfo = id => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

//ADD UPLOADED Profile Picture
module.exports.addProfilePic = (fullUrl, userId) => {
    return db.query(`UPDATE users SET url = $1 WHERE id = $2 RETURNING url`, [
        fullUrl,
        userId
    ]);
};
