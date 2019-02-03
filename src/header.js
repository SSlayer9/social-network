import React from "react";
import Profilepic from "./profilepic";

export default function Header(props) {
    return (
        <div className="header">
            <div className="header-logo-container">
                {" "}
                <img src="/assets/unicorn-logo.png" />
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

// const header = {
//     width: "100vw",
//     height: "78px",
//     borderBottom: "2px solid purple"
// };
// const header-logo = {
//     width: "270px",
//     height: "auto",
//     position: "absolute",
//     top: "0",
//     left: "0"
// };
// const header-pic = {
//     // maxHeight: "100%",
//     width: "100px",
//     height: "100px",
//     position: "absolute",
//     top: "0",
//     right: "0"
// };
