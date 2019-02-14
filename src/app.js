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
import Wall from "./wall";

import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import AllUsers from "./allUsers";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            showOnlineUser: false,
            showWall: false,
            first: "",
            last: "",
            pictureUrl: "",
            id: "",
            bio: ""
        };
        this.showUploader = this.showUploader.bind(this);
        this.updateProfileUrl = this.updateProfileUrl.bind(this);
        this.toggleOnlineUser = this.toggleOnlineUser.bind(this);
        this.toggleWall = this.toggleWall.bind(this);
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

    toggleWall() {
        this.setState({
            showWall: !this.state.showWall
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
                        toggleWall={this.toggleWall}
                    />
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
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
                                    showWall={this.state.showWall}
                                />
                            )}
                        />
                        <Route path="/user/:id" component={OtherProfile} />
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                updateProfileUrl={this.updateProfileUrl}
                            />
                        )}
                        {this.state.showOnlineUser && <OnlineUsers />}

                        <Route
                            exact
                            path="/friends"
                            render={() => (
                                <Friends
                                    showOnlineUser={this.state.showOnlineUser}
                                />
                            )}
                        />

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

                        <Route
                            exact
                            path="/allusers"
                            render={() => <AllUsers id={this.state.id} />}
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
