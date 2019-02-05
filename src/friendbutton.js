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

    // FIXME:
    componentDidMount() {
        //get the initial status of friendship mit GEt Route
        //based off the status
        //hier machen wir die
        axios
            .get("/get-initial-status/" + this.props.otherUserId)
            .then(response => {
                console.log("friendship mounts response: ", response);
                this.setState({
                    buttonText: response.data.buttonText
                });
            })
            .catch(err => {
                console.log("Err axios get-inital-status:", err);
            });
        // console.log the respone and setState({}) basend on the response. If getting nothing back(no friendshipt) then button shoul say <add friiend>

        // response accepted: true -> <end friendship> btn by changing btn-text in state

        // TODO: //if accepted is false, button should say either <accept friendshipt> or <cancelFriendrequest> . depending on who send the request.
    }

    updateFriendship() {
        console.log("Friendship was clicked!");

        axios
            .post("/send-friend-request" + this.props.otherUserId, {
                buttonText: this.state.buttonText
            })
            .then(response);

        //here are all the POST routes
        //have to read what the button text says und dann die dem entsprechende Function ausfuhren
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
