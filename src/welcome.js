import React from "react";
import Registration from "./registration";
import { HashRouter, Route, Link } from "react-router-dom";
console.log(Registration);
//this is a function component

export default function Welcome() {
    return (
        <div className="welcome-page">
            <HashRouter>
                <div>
                    <h1>Welcome to this Social Network</h1>
                    <Route exact path="/" component={Registration} />
                </div>
            </HashRouter>
        </div>
    );
}

//----------------
{
    /* <div>
    <Route exact path="/" component={Registration} />
    <Route path="/login" component={Login} />
</div>; */
}
