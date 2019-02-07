import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route, Link } from "react-router-dom";

//this is a function component
export default function Welcome() {
    return (
        <div>
            <HashRouter>
                <div className="landing-flexcontainer">
                    <div>
                        <img
                            className="logo-text"
                            src="/assets/unicornsss.png"
                            alt="unicorn logo"
                        />
                        <div className="landing-image-container">
                            <img
                                className="logo-image"
                                src="/assets/wale-unicorn-shadow.png"
                            />
                        </div>
                    </div>

                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
