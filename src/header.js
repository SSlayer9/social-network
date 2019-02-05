import React from "react";
import Profilepic from "./ProfilePic";

export default function Header(props) {
    return (
        <div className="header">
            <div className="header-logo-container">
                {" "}
                <img id="header-logo" src="/assets/unicorn-logo.png" />
            </div>

            <div className="header-pic-container">
                <Profilepic
                    showUploader={props.showUploader}
                    pictureUrl={props.pictureUrl}
                    updateProfileUrl={props.updateProfileUrl}
                />
            </div>
        </div>
    );
}
