import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

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
        axios
            .post("/welcome/login", {
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                console.log("Data in axios login", data);
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
        return (
            <div className="registration-form">
                <h1>Please Log In!</h1>
                {this.state.error && (
                    <div className="error">
                        Oops! Something went wrong,please try again!
                    </div>
                )}

                <label htmlFor="email">Email</label>
                <input name="email" id="email" onChange={this.handleChange} />

                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    id="password"
                    onChange={this.handleChange}
                />

                <button className="login-btn" onClick={this.submit}>
                    Log In
                </button>
                <Link to="/" className="register-offer">
                    Back to Registration
                </Link>
            </div>
        );
    }
}
