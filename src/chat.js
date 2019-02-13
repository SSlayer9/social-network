import React from "react";
import { connect } from "react-redux";
import { initSocket } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.socket = initSocket();
    }

    handleChange(e) {
        console.log("etarge: ", e.target.value);
        this.chatBox = e.target.value;
    }

    submit(e) {
        this.socket.emit("singleMessage", {
            message: this.chatBox,
            first: this.props.first,
            last: this.props.last,
            pic: this.props.url
        });
        e.target.value = "";
    }

    componentDidUpdate() {
        if (!this.elem) {
            return null;
        }
        this.elem.scrollTop = this.elem.scrollHeight;
    }

    render() {
        const { messages } = this.props;

        if (!messages) {
            return null;
        } else {
            var chatList = (
                <div>
                    {messages.map(message => (
                        <div key={message.id} className="message-container">
                            <p> {message.messages} </p>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div>
                <h1> Hi I am Chat running, what the fudge!!!!</h1>
                <div className="chat-window">
                    {!!messages.length && chatList}
                    <textarea
                        placeholder="Type your Message"
                        onChange={this.handleChange}
                        name="chatBox"
                        rows="7"
                        className="chat-textarea"
                    />
                    <button onClick={this.submit}>Send</button>
                    {/* <button
                        onClick={() =>
                            this.socket.emit("singleMessage", {
                                message: this.chatBox,
                                first: this.props.first,
                                last: this.props.last,
                                pic: this.props.url
                            })
                        }
                    >
                        Send
                    </button> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("State in Chat:", state);
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Chat);
