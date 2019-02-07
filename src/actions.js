import axios from "./axios";

export async function receiveFriendsAndWannabes() {
    const friendsAndWannabes = await axios.get("/friends-and-wannabes");
    console.log("fw: ", friendsAndWannabes);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsAndWannabes: friendsAndWannabes.data.friends
    };
}

// export async function acceptFriendship(??? getOtherUserInfo.Id) {
//     const friends = await axios.post('accept-friend-request/:id')
//     type: 'ACCEPT_FRIENDSHIP',
//     ???: ???   FIXME:
// }

// export async function endFriendship(???otherUserId??) {
//     const unfriends = await axios.post('/cancel-friend-request/:id')
//     return {
//         type: 'END_FRIENDSHIP',
//         ???: ????  FIXME:
//     }
// }
