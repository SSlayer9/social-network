import React from "react";
import Profilepic from "./profilepic";

export default function Profile(props) {
    return (
        <div className="profile">
            <Profilepic
                showUploader={props.showUploader}
                pictureUrl={props.pictureUrl}
                updateProfileUrl={props.updateProfileUrl}
            />
        </div>
    );
}
