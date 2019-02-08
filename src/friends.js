import React from "react";
import {
    receiveFriendsAndWannabes,
    acceptFriendship,
    endFriendship
} from "./actions";
import { connect } from "react-redux";

class Friends extends React.Component {
    // constructor(props) {
    //     super (props);
    // }

    componentDidMount() {
        this.props.dispatch(receiveFriendsAndWannabes());
    }

    // TODO: // chekc this render function!!!!!!!!!!! NOT WORKING!
    render() {
        const { wannabes, friends } = this.props;
        if (!wannabes) {
            return null;
        }
        console.log("Wannabelist:", wannabes);

        const wannabeList = (
            <div>
                {wannabes.map(wannabe => (
                    <div>
                        <li key={wannabe.id}>
                            {wannabe.first} {wannabe.last}
                        </li>
                        <img src={wannabe.url} />
                        <button
                            onCLick={e =>
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
                ;
            </div>
        );

        const acceptedFriends = friends.map(friend => {
            <div key={friend.id}>
                <img src={friend.url} />
                <p>
                    {" "}
                    {friend.first} {friend.last}
                </p>
                <button
                    onClick={e => this.props.dispatch(endFriendship(friend.id))}
                >
                    End Friendship
                </button>
            </div>;
        });

        return (
            <div>
                {!friends.length && <div>Nobody is hot!</div>}
                {wannabes.length && wannabeList}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("STATE:", state);
    return {
        wannabes:
            state.friendslist &&
            state.friendslist.filter(friend => friend.accepted == false),

        friends:
            state.friendslist &&
            state.friendslist.filter(friend => friend.accepted == true)
    };
};
export default connect(mapStateToProps)(Friends);
