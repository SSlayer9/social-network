import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route, Link } from "react-router-dom";

//this is a function component
export default function Welcome() {
    return (
        <div className="welcome-page">
            <HashRouter>
                <div className="landing-page">
                    <h1 className="landing-title">
                        Welcome to this Social Network
                    </h1>
                    <div className="landing-image-wrapper">
                        <img id="landing-image" src="/assets/logo.png" />
                    </div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
