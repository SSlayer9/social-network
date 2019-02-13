import axios from "./axios";

export async function receiveFriendsAndWannabes() {
    const response = await axios.get("/friends-and-wannabes");

    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsAndWannabes: response.data.friends
    };
}

export async function acceptFriendship(wannabeId) {
    const response = await axios.post("/accept-friend-request/" + wannabeId);

    return {
        type: "ACCEPT_FRIENDSHIP",
        acceptedFriend: wannabeId
    };
}

export async function endFriendship(friendId) {
    const response = await axios.post("/cancel-friend-request/" + friendId);

    return {
        type: "END_FRIENDSHIP",
        deletedFriend: friendId
    };
}

// SOCKET.IO ONLINER USERS

export function allOnlineUsers(onlineUsers) {
    console.log("AllOnlineUsers Action running: ", onlineUsers);
    return {
        type: "ONLINE_USERS",
        onlineUsers
    };
}

export function userWhoJoined(joinedUser) {
    return {
        type: "USER_WHO_JOINED",
        joinedUser
    };
}

export function userWhoLeft(leftUser) {
    return {
        type: "USER_WHO_LEFT",
        leftUser
    };
}

export function showMessages(messages) {
    return {
        type: "SHOW_RECENT_MESSAGES",
        messages
    };
}

export function showNewMessage(message) {
    return {
        type: "SHOW_MESSAGE",
        message
    };
}
