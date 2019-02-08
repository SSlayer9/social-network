import axios from "./axios";

export async function receiveFriendsAndWannabes() {
    const response = await axios.get("/friends-and-wannabes");
    console.log("fw: ", response);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsAndWannabes: response.data.friends
    };
}

export async function acceptFriendship(wannabeId) {
    const response = await axios.post("/accept-friend-request/" + wannabeId);
    console.log("New Friend Id:", response);
    return {
        type: "ACCEPT_FRIENDSHIP",
        acceptedFriend: wannabeId
    };
}

export async function endFriendship(friendId) {
    const response = await axios.post("/cancel-friend-request/" + friendId);
    console.log("delete Friend response: ", response);
    return {
        type: "END_FRIENDSHIP",
        deletedFriend: friendId
    };
}
