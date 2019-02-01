import React from "react";
import Profilepic from "./profilepic";

export default function Header(props) {
    return (
        <div style={header}>
            <img style={logo} src="/assets/logo.png" />
            <div style={pic}>
                <Profilepic
                    showUploader={props.showUploader}
                    pictureUrl={props.pictureUrl}
                    updateProfileUrl={props.updateProfileUrl}
                />
            </div>
        </div>
    );
}

const header = {
    width: "100vw",
    height: "100px"
};
const logo = {
    width: "100px",
    height: "100px",
    position: "absolute",
    top: "0",
    left: "0"
};
const pic = {
    maxHeight: "100%",
    // width: "100px",
    // height: "100px",
    position: "absolute",
    top: "0",
    right: "0"
};
