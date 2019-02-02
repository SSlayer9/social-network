import React from "react";
import Logo from "./logo";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Header from "./header";
import { bindActionCreators } from "redux";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.updateProfileUrl = this.updateProfileUrl.bind(this);
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

    render() {
        return (
            <div>
                <Header
                    showUploader={this.showUploader}
                    pictureUrl={this.state.pictureUrl}
                    updateProfileUrl={this.updateProfileUrl}
                />
                <ProfilePic
                    showUploader={this.showUploader}
                    pictureUrl={this.state.pictureUrl}
                    first={this.state.first}
                    last={this.state.last}
                    updateProfileUrl={this.updateProfileUrl}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader updateProfileUrl={this.updateProfileUrl} />
                )}
                <h1>Welcome, {this.state.first}</h1>
            </div>
        );
    }
}
