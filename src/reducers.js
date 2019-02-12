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

    if (action.type == "END_FRIENDSHIP") {
        console.log("endFrindship", action.deletedFriend);
        state = {
            ...state,
            friendslist: state.friendslist.filter(friend => {
                return friend.id !== action.deletedFriend;
            })
        };
    }
    // ---------- SOCKET REDUCERS ------------------

    if (action.type == "ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
        return state;
    }

    if (action.type == "USER_WHO_JOINED") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.concat(action.joinedUser)
        };
    }

    if (action.type == "USER_WHO_LEFT") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                item => item.id != action.userWhoLeft
            )
        };
    }

    // CHAT MESSAGES

    if (action.type == "SHOW_RECENT_MESSAGES") {
        state = {
            ...state,
            recentMessages: action.recentMessages
        };
    }

    if (action.type == "SHOW_MESSAGE") {
        state = {
            ...state,
            messages: [...state.messages, action.message]
        };
    }

    // if none of the above conditionals apply, return initial state
    return state;
}
