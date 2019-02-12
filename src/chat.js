import React from "react";
import { connect } from "react-redux";
import { initSocket } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.sendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.chatInput = e.target.value
    }

    submit(e) {
        const socket = initSocket();
        socket.emit('singleMessage', {
            message : this.chatInput,
            first: this.props.first,
            last: this.props.last,
            pic: this.props.url
        })
        e.target.value = ''
    }

    componentDidUpdate() {
        if (!this.elem) {
            return null
        }
        this.elem.scrollTop = this.elem.scrollHeight
    }

    render() {
        const {messages} = this.props

        if (!messages) {
            return null
        }
    }






const mapStateToProps = function (state) {
    return {
        messages: state.recentMessages
    }
}


}

export default connect(mapStateToProps)(Chat)
