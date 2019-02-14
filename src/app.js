import React from "react";
import Logo from "./Logo";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Header from "./header";
import Profile from "./profile";
import OnlineUsers from "./onlineUsers";
import OtherProfile from "./otherProfile";
import Friends from "./friends";
import BioEditor from "./bioeditor";
import Chat from "./chat";

import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            showOnlineUser: false,
            first: "",
            last: "",
            pictureUrl: "",
            id: "",
            bio: ""
        };
        this.showUploader = this.showUploader.bind(this);
        this.updateProfileUrl = this.updateProfileUrl.bind(this);
        this.toggleOnlineUser = this.toggleOnlineUser.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await axios.get("/user");
            const { id, first, last, url } = response.data[0];
            this.setState({
                first,
                last,
                pictureUrl: url,
                id
            });
        } catch (err) {
            console.log(err.message);
        }

        try {
            const response = await axios.get("/userbio");
            const bio = response.data;

            this.setState({
                bio
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    toggleOnlineUser() {
        this.setState({
            showOnlineUser: !this.state.showOnlineUser
        });
    }

    updateProfileUrl(url) {
        this.setState({
            pictureUrl: url,
            uploaderIsVisible: false
        });
    }

    updateBio(bio) {
        this.setState({
            bio
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header
                        showUploader={this.showUploader}
                        pictureUrl={this.state.pictureUrl}
                        updateProfileUrl={this.updateProfileUrl}
                        first={this.state.first}
                        toggleOnlineUser={this.toggleOnlineUser}
                    />
                    <div>
                        {/* <Switch> */}
                        <Route
                            exact
                            path="/"
                            render={() => (
                                // <div className="wrapper">
                                <Profile
                                    showUploader={this.showUploader}
                                    pictureUrl={this.state.pictureUrl}
                                    first={this.state.first}
                                    last={this.state.last}
                                    updateProfileUrl={this.updateProfileUrl}
                                    bio={this.state.bio}
                                    toggleBioEditor={this.toggleBioEditor}
                                    bioEditorIsVisible={
                                        this.state.bioEditorIsVisible
                                    }
                                    updateBio={this.updateBio}
                                />
                                // </div>
                            )}
                        />
                        <Route path="/user/:id" component={OtherProfile} />
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                updateProfileUrl={this.updateProfileUrl}
                            />
                        )}
                        {this.state.showOnlineUser && <OnlineUsers />}
                        {/* <Route exact path="/friends" component={Friends} /> */}
                        <Route
                            exact
                            path="/friends"
                            render={() => (
                                <Friends
                                    showOnlineUser={this.state.showOnlineUser}
                                />
                            )}
                        />
                        {/* // <Redirect path="*" to="/" /> */}
                        {/* // </Switch> */}
                        {/* //{" "} */}
                        {/* <Route exact path="/online" component={OnlineUsers} /> */}
                        <Route
                            exact
                            path="/chat"
                            render={() => (
                                <Chat
                                    first={this.state.first}
                                    last={this.state.last}
                                    url={this.state.pictureUrl}
                                />
                            )}
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

// name = { this.state.firstName }
// last = { this.state.lastName }
// picture = { this.state.profilePic }
// key = { props.match.url }
// match = { props.match }
// history = { props.history }
