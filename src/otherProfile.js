import React from "react";
import axios from "./axios";
import Profilepic from "./profilepic";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get("/user/" + this.props.match.params.id + "/info")
            .then(
                function(response) {
                    console.log("App gett user/:id: Shanti??", response.data);

                    if (response.data.redirectTo) {
                        this.props.history.push(response.data.redirectTo);
                    }
                    const first = response.data.first;
                    const last = response.data.last;
                    const pictureUrl = response.data.url;
                    const bio = response.data.bio;
                    const id = response.data.id;

                    this.setState({
                        first,
                        last,
                        pictureUrl,
                        bio,
                        id
                    });
                }.bind(this)
            )
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div className="wrapper">
                <div className="profile">
                    <img src={this.state.pictureUrl} alt={this.state.first} />

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
