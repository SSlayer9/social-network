import React from "react";
import Logo from "./logo";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
    }

    componentDidMount() {
        axios.get("/user");
        // TODO: get Info about logged in User with that request
        this.setState({
            //TODO: we want to set the state for the user. Make this dynamic(find a way myself)
            first: "Gitti",
            last: "Fries"
        });
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
