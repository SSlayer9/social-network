import React from "react";
import {
    receiveFriendsAndWannabes,
    acceptFriendship,
    endFriendship
} from "./actions";
import OnlineUsers from "./onlineUsers";
import { connect } from "react-redux";

class Friends extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.dispatch(receiveFriendsAndWannabes());
    }

    render() {
        const { wannabes, friends } = this.props;
        if (!wannabes) {
            return null;
        }
        console.log("Wannabelist:", wannabes);

        const wannabeList = (
            <div>
                <h2>
                    These {wannabes.length} Unicorns want to be your friends:
                </h2>
                {wannabes.map(wannabe => (
                    <div key={wannabe.id} className="wannabe-container">
                        <img
                            className="wannabe-img"
                            src={wannabe.url || "/assets/default-img.png"}
                        />
                        <p>
                            {wannabe.first} {wannabe.last}
                        </p>
                        <button
                            onClick={e =>
                                this.props.dispatch(
                                    acceptFriendship(wannabe.id)
                                )
                            }
                        >
                            {" "}
                            Accept
                        </button>
                    </div>
                ))}
            </div>
        );

        const acceptedFriends = (
            <div>
                <h2>These {friends.length} Unicorns are Your Friends</h2>

                {friends.map(friend => (
                    <div key={friend.id} className="wannabe-container">
                        <img src={friend.url} className="wannabe-img" />
                        <p>
                            {" "}
                            {friend.first} {friend.last}
                        </p>
                        <button
                            onClick={() =>
                                this.props.dispatch(endFriendship(friend.id))
                            }
                        >
                            Unfriend
                        </button>
                    </div>
                ))}
            </div>
        );

        return (
            <div>
                <div className="friends-wrapper">
                    {!friends.length && (
                        <div className="no-friends">
                            <p>You Have No Friends</p>
                            <img
                                src="/assets/sad-uniwale3.png"
                                className="sad-uniwale"
                            />
                        </div>
                    )}
                    {!!wannabes.length && wannabeList}
                    {!!friends.length && acceptedFriends}
                </div>

                {this.props.showOnlineUser && <OnlineUsers />}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("STATE:", state);
    return {
        wannabes:
            state.friendslist &&
            state.friendslist.filter(wannabe => wannabe.accepted == false),

        friends:
            state.friendslist &&
            state.friendslist.filter(friend => friend.accepted == true)
    };
};
export default connect(mapStateToProps)(Friends);
