import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: ""
        };
        this.updateFriendship = this.updateFriendship.bind(this);
    }

    //get the current status of friendship when profile loads
    async componentDidMount() {
        try {
            const response = await axios.get(
                "/get-initial-status/" + this.props.otherUserId
            );
            this.setState({
                buttonText: response.data.buttonText
            });
        } catch (err) {
            console.log(err.message);
        }
    }
    // change the status of friendship after clicking button
    updateFriendship() {
        if (this.state.buttonText == "Add") {
            axios.post("/send-friend-request/" + this.props.otherUserId);
            this.setState({
                buttonText: "Cancel"
            });
        }
        if (this.state.buttonText == "Cancel") {
            axios.post("/cancel-friend-request/" + this.props.otherUserId);
            this.setState({
                buttonText: "Add"
            });
        }
        if (this.state.buttonText == "Accept") {
            axios.post("/accept-friend-request/" + this.props.otherUserId);
            this.setState({
                buttonText: "Unfriend"
            });
        }
        if (this.state.buttonText == "Unfriend") {
            axios.post("/cancel-friend-request/" + this.props.otherUserId);
            this.setState({
                buttonText: "Add"
            });
        }
    }

    render() {
        console.log("otherUserId: ", this.props.otherUserId);
        return (
            <button onClick={this.updateFriendship}>
                {this.state.buttonText}
            </button>
        );
    }
}
