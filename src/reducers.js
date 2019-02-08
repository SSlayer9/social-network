export default function(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = { ...state, friendslist: action.friendsAndWannabes };
    }

    if (action.type == "ACCEPT_FRIENDSHIP") {
        console.log("accepted friend:", action.acceptedFriend);
        state = {
            ...state,
            friendslist: state.friendslist.map(friend => {
                if (friend.id == action.acceptedFriend) {
                    return { ...friend, accepted: true };
                } else {
                    return friend;
                }
            })
        };
    }
    return state;
}

// 'ACCEPT_FRIEND_REQUEST'

// 'UNFRIEND'
