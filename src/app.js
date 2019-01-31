import React from "react";
import Logo from "./logo";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import { bindActionCreators } from "redux";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
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

    render() {
        return (
            <div>
                <Logo />
                <ProfilePic first={this.state.first} />
                {this.state.uploaderIsVisible} && <Uploader />
                <h1>Welcome, {this.state.first}</h1>
            </div>
        );
    }
}
