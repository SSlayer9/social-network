import React from "react";
import axios from "./axios";
import { HashRouter, Route, Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        axios
            .post("/register", {
                first: this.first,
                email: this.email
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        console.log("I am rendering");
        return (
            <div>
                {this.state.error && (
                    <div className="error">Oops! Something went wrong!</div>
                )}
                <label for="first">First name</label>
                <input name="first" id="first" onChange={this.handleChange} />
                <label for="last">Last Name</label>
                <input name="last" id="last" onChange={this.handleChange} />
                <label for="email">Your Best Email</label>
                <input name="email" id="email" onChange={this.handleChange} />
                <label for="password">Password</label>
                <input name="pass" id="password" onChange={this.handleChange} />
                <button onClick>Register</button>
                <Link to="/login">Log In</Link>
                {/* replaces <a></a> */}
            </div>
        );
    }
}
