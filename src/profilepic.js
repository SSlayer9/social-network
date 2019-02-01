import React from "react";

export default function ProfilePic(props) {
    let url;

    if (props.pictureUrl == null) {
        url = "/assets/default-img.png";
    } else {
        url = props.pictureUrl;
        // url = props.updateProfileUrl;
    }
    let name = props.first + "" + props.last;

    return (
        <div style={profileBox} onClick={props.showUploader}>
            <img src={url} alt={name} style={pic} />
        </div>
    );
}

const profileBox = {
    width: "100px",
    height: "100px",
    cursor: "pointer"
};
const pic = {
    width: "100%"
};
