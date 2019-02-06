import React from "react";
import Logo from "./Logo";
import axios from "./Axios";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Header from "./Header";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import BioEditor from "./BioEditor";
import { bindActionCreators } from "redux";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            bioEditorIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.updateProfileUrl = this.updateProfileUrl.bind(this);
        this.toggleBioEditor = this.toggleBioEditor.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then(
            function(response) {
                const id = response.data[0].id;
                const first = response.data[0].first;
                const last = response.data[0].last;
                const pictureUrl = response.data[0].url;

                this.setState({
                    id,
                    first,
                    last,
                    pictureUrl
                });
            }.bind(this)
        );

        axios.get("/userbio").then(
            function(response) {
                const bio = response.data;

                this.setState({
                    bio
                });
            }.bind(this)
        );
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    updateProfileUrl(url) {
        this.setState({
            pictureUrl: url,
            uploaderIsVisible: false
        });
    }

    toggleBioEditor() {
        this.setState({
            bioEditorIsVisible: !this.state.bioEditorIsVisible
        });
    }

    updateBio(bio) {
        this.setState({
            bio
        });
    }

    render() {
        return (
            <div>
                <Header
                    showUploader={this.showUploader}
                    pictureUrl={this.state.pictureUrl}
                    updateProfileUrl={this.updateProfileUrl}
                />
                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div className="wrapper">
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
                                </div>
                            )}
                        />
                        <Route path="/user/:id" component={OtherProfile} />

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                updateProfileUrl={this.updateProfileUrl}
                            />
                        )}
                        <Redirect path="*" to="/" />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
