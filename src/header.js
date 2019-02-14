import React from "react";
import Profilepic from "./profilepic";
import OnlineUsers from "./onlineUsers";

import { BrowserRouter, Link } from "react-router-dom";

export default function Header(props) {
    return (
        <div className="header">
            <div className="header-logo-container">
                {" "}
                <img id="header-logo" src="/assets/unicorn-logo.png" />
            </div>
            <div className="nav-bar">
                {/* <Link to="/online">Now Online</Link> */}
                <p onClick={props.toggleOnlineUser} className="link">
                    {" "}
                    Now Online
                </p>
                <Link to="/friends" className="link">
                    Show Friends
                </Link>
                <Link to="/chat" className="link">
                    Chat
                </Link>
                <a href="/logout" className="link">
                    <p>Log Out</p>
                </a>

                <div className="header-pic-container">
                    <Link to="/">
                        <Profilepic
                            showUploader={props.showUploader}
                            pictureUrl={props.pictureUrl}
                            updateProfileUrl={props.updateProfileUrl}
                            id="header-img"
                        />
                    </Link>
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
