import React from "react";
import Profilepic from "./profilepic";
import { BrowserRouter, Link } from "react-router-dom";

export default function Header(props) {
    return (
        <div className="header">
            <div className="header-logo-container">
                {" "}
                <img id="header-logo" src="/assets/unicorn-logo.png" />
            </div>
            <div className="nav-bar">
                <Link to="/online">Now Online</Link>
                <Link to="/friends">Show Friends</Link>
                <a href="/logout">
                    <p>Log Out</p>
                </a>

                <div className="header-pic-container">
                    <Profilepic
                        showUploader={props.showUploader}
                        pictureUrl={props.pictureUrl}
                        updateProfileUrl={props.updateProfileUrl}
                        id="header-img"
                    />
                </div>
                {/* <Link to="/">{props.first}</Link> */}
            </div>
        </div>
    );
}

{
    /* <nav>
    <ul>
        <li>
            <Link to="/friends">Friends</Link>
        </li>
        <li>
            <a href="/logout">Log Out</a>
        </li>
        <li>
            <Link to="/">Home</Link>
        </li>
    </ul>
</nav>; */
}
