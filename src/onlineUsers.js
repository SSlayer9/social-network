import React from "react";
import { connect } from "react-redux";
import { onlineUsers } from "./actions";

class OnlineUsers extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // this.props.dispatch(onlineUsers());
    }

    render() {
        const { onlineUsers } = this.props;
        if (!onlineUsers) {
            return null;
        }

        const listOnlineUsers = (
            <div>
                {onlineUsers.map(user => {
                    <div key={user.id}>
                        <img src={user.url || "/assets/default-img.png"} />
                        <p>
                            {user.first}
                            {user.last}
                        </p>
                    </div>;
                })}
            </div>
        );

        return (
            <div>
                <div>Hi i am OnlineUsers, what the heck!!!!</div>
                <div>
                    {!onlineUsers.length && <h3>Nobody is online</h3>}
                    {!!onlineUsers.length && listOnlineUsers}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        onlineUsers: state.onlineUsers
    };
};

export default connect(mapStateToProps)(OnlineUsers);
