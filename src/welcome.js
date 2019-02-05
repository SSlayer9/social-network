import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route, Link } from "react-router-dom";

//this is a function component
export default function Welcome() {
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <HashRouter>
                <div className="landing-flexcontainer">
                    <img
                        style={logoSize}
                        src="/assets/unicornsss.png"
                        alt="unicorn logo"
                    />
                    <div className="landing-image-container">
                        <img
                            className="logo-image"
                            style={image}
                            src="/assets/wale-unicorn-shadow.png"
                        />
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
    flexDirection: "column",
    alignItems: "center"
};
const imageSize = {
    width: "200px",
    height: "200px"
};
const image = {
    paddingTop: "2rem",
    maxWidth: "100%",
    maxHeight: "100%"
};

const logoSize = {
    width: "80%",
    height: "auto"
};

// const logoAnimation = {
//     animation: 'logo-float infinite 20s linear'
// }
// const float = keyframes`
// from {
//     transform: rotate(0deg);
// }
// to {
//     transform: rotate(360deg);
// }

// // ----------------
//     const pulse = keyframes`
//   from {
//     background-color: #001F3F;
//   }

//   to {
//     background-color: #FF4136;
