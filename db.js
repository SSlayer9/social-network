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

//ADD USER BIO
module.exports.addUserBio = (bio, id) => {
    return db.query(`UPDATE users SET bio = $1 WHERE id=$2 RETURNING bio`, [
        bio,
        id
    ]);
};

//GET USER BIO
module.exports.getUserBio = id => {
    return db.query(`SELECT bio FROM users WHERE id=$1`, [id]);
};

//GET OTHERUSER INFO
module.exports.getOtherUserInfo = id => {
    return db.query(`SELECT first, last, url, bio, id FROM users WHERE id=$1`, [
        id
    ]);
};

//CREATE FRIENDSHIP
module.exports.createFriendship = (loggedInUserId, otherUserId) => {
    return db.query(
        ` INSERT INTO friendships (sender_id , receiver_id) VALUES ( $1, $2) RETURNING accepted `,
        [loggedInUserId, otherUserId]
    );
};

//GET FRIENDSHIP STATUS
module.exports.getFriendshipStatus = (loggedInUserId, otherUserId) => {
    return db.query(
        `
    SELECT * FROM friendships
    WHERE (receiver_id = $1 AND sender_id = $2)
    OR (receiver_id = $2 AND sender_id = $1) `,
        [loggedInUserId, otherUserId]
    );
};

// ACCEPT FRIENDSHIP
module.exports.acceptFriendship = (loggedInUserId, otherUserId) => {
    return db.query(
        `UPDATE friendships
         SET accepted = true
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
       `,
        [loggedInUserId, otherUserId]
    );
};

//END FRIENDSHIP
module.exports.endFriendship = (loggedInUserId, otherUserId) => {
    return db.query(
        ` DELETE FROM friendships  
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1) `,
        [loggedInUserId, otherUserId]
    );
};

// GET WHOLE LIST FRIENDS AND WANNA-BE FRIENDS
module.exports.getFriendsAndWannabes = userId => {
    return db.query(
        ` SELECT users.id, first, last, url, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
        [userId]
    );
};

// GET USERS WHO ARE ONLINE
module.exports.getUsersByIds = arrayOfIds => {
    return db.query(
        ` SELECT id, first, last, url FROM users WHERE id = ANY ($1)`,
        [arrayOfIds]
    );
};

// USER WHO JOINED
module.exports.getJoinedUser = userId => {
    return db.query(`SELECT id,first,last,url FROM users WHERE id = $1`, [
        userId
    ]);
};

// INSERT MESSAGE
module.export.insertMessage = (message, userId) => {
    return db.query(
        `INSERT INTO chats (messages, user_id) VALUES ($1,$2) RETURNING *`,
        [message, userId]
    );
};

// GET LAST 10 MESSAGES
module.export.getMessages = () => {
    return db.query(
        `SELECT chat.id, chat.messages, chat.created_at, users.first, users.last, users.url
        FROM chats
        JOIN users
        ON users.id = user_id
        ORDER BY chats.id DESC
        LIMIT 10`
    );
};
