import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route, Link } from "react-router-dom";

//this is a function component
export default function Welcome() {
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <HashRouter>
                <div style={flexContainer}>
                    <h1>Welcome to this Social Network</h1>
                    <div style={imageSize}>
                        <img style={image} src="/assets/logo.png" />
                    </div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

const flexContainer = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
};
const imageSize = {
    width: "200px",
    height: "200px"
};
const image = {
    maxWidth: "100%",
    maxHeight: "100%"
};
