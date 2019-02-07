export default function(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        const IDKyet = {
            ...state,
            friendslist: action.friendsAndWannabes
        };
        return IDKyet;
    }
    return state;
}

// 'ACCEPT_FRIEND_REQUEST'

// 'UNFRIEND'
