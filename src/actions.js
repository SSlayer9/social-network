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

export function onlineUsers(onlineUsers) {
    console.log("onlineUsers Action running: ", onlineUsers);
    return {
        type: "ONLINEUSERS",
        onlineUsers
    };
}

// VORLAGE----------------------------------------------
// export function onlineUsers(onlineUsers) {
//     // console.log("onlineUsers action fired:", onlineUsers);
//     return {
//         type: "ONLINEUSERS",
//         onlineUsers
//     };
// }
