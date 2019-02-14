import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import Wall from "./wall";
// import FriendButton from "./Friendbutton";

export default function Profile(props) {
    return (
        <div className="flex-wrapper">
            <div className="profile">
                <div className="profile-img-container">
                    <ProfilePic
                        showUploader={props.showUploader}
                        pictureUrl={props.pictureUrl}
                        updateProfileUrl={props.updateProfileUrl}
                    />
                </div>

                <div className="profile-wrapper">
                    <p className="capitalize">
                        {props.first} {props.last}
                    </p>
                </div>

                <BioEditor
                    bio={props.bio}
                    updateBio={props.updateBio}
                    toggleBioEditor={props.toggleBioEditor}
                />
            </div>
            {props.showWall && <Wall />}
        </div>
    );
}
