import React from "react";
import axios from "./Axios";
import FriendButton from "./FriendButton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        try {
            let response = await axios.get(
                "/user/" + this.props.match.params.id + "/info"
            );

            if (response.data.redirectTo) {
                this.props.history.push(response.data.redirectTo);
            } else {
                const { first, last, url, bio, id } = response.data;
                this.setState({
                    first,
                    last,
                    pictureUrl: url,
                    bio,
                    id
                });
            }
        } catch (err) {
            console.log("Err in Mount fn otherProfile: ", err);
        }
    }
    render() {
        return (
            <div className="wrapper">
                <div className="profile">
                    <div className="img-btn-wrapper">
                        <img
                            src={this.state.pictureUrl}
                            alt={this.state.first}
                        />

                        <FriendButton
                            otherUserId={this.props.match.params.id}
                        />
                    </div>

                    <div className="profile-wrapper">
                        <h1 className="profile-welcome">
                            {this.state.first}-Unicorn {this.state.last}
                        </h1>
                        <p className="about-padding">About me:</p>
                        <div className="bio-container"> {this.state.bio}</div>
                    </div>
                </div>
            </div>
        );
    }
}
