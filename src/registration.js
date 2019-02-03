import React from "react";
import axios from "./axios";
import { HashRouter, Route, Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // we bind to make sure handleChange Function and submit Function have acess to components attributs like this.props and this.state
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        //this grabs the value of input and assigns it to this
        this[e.target.name] = e.target.value;
    }
    submit() {
        console.log("this is in axios registration:", this);
        axios
            .post("/welcome/register", {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                console.log("Data:", data);
                if (data.success) {
                    location.replace("/"); //this is redirecting to app.js,when logged in
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
            <div style={form}>
                {this.state.error && (
                    <div className="error">Oops! Something went wrong!</div>
                )}

                <label htmlFor="first">First name</label>
                <input name="first" id="first" onChange={this.handleChange} />

                <label htmlFor="last">Last Name</label>
                <input name="last" id="last" onChange={this.handleChange} />

                <label htmlFor="email">Your Best Email</label>
                <input name="email" id="email" onChange={this.handleChange} />

                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    id="password"
                    onChange={this.handleChange}
                />

                <button onClick={this.submit}>Register</button>
                <Link to="/login">Log In</Link>
            </div>
        );
    }
}

const form = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto"
};
