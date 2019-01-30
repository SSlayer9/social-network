import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        //this function grabs the value of the input-fields
        this[e.target.name] = e.target.value;
    }
    submit() {
        console.log("this in axios login: ", this);
        axios.post("/welcome/login");
    }
    render() {
        return (
            <div className="form">
                <h1>Please log in!</h1>

                <label htmlFor="email">email</label>
                <input name="email" id="email" />

                <label htmlFor="password">Password</label>
                <input name="password" id="password" />

                <button onClick={this.submit}>Log In</button>
                <Link to="/">Back to Registration</Link>
            </div>
        );
    }
}
