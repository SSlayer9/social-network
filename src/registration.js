import React from "react";
import axios from "./Axios";
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
    async submit() {
        console.log("this is in axios registration:", this);
        try {
            let response = await axios.post("/welcome/register", {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
            });

            if (response.data.success) {
                location.replace("/");
            } else {
                this.setState({
                    error: true
                });
            }
        } catch (err) {
            console.log("Err in Registration Submit: ", err);
        }
    }
    render() {
        console.log("I am rendering");
        return (
            <div className="registration-form">
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

                <button className="register-btn" onClick={this.submit}>
                    Register
                </button>
                <p className="login-offer">
                    Already a Unicorn? Please <Link to="/login">Log In</Link>
                </p>
            </div>
        );
    }
}
