import React from "react";
import {
    receiveFriendsAndWannabes,
    acceptFriendship,
    endFriendship
} from "./actions";
import { connect } from "react-redux";

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveFriendsAndWannabes());
    }

    render() {
        return <h1>Hi, I am the friends page!</h1>;
    }
}

const mapStateToProps = function(state) {
    console.log("STATE:", state);
    return {
        OpenFriendsrequest:
            state.friendslist &&
            state.friendslist.filter(friend => friend.accepted == false),

        acceptedFriendrequest:
            state.friendslist &&
            state.friendslist.filter(friend => friend.accepted == true)
    };
};
export default connect(mapStateToProps)(Friends);
