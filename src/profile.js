import React from "react";
import Profilepic from "./profilepic";
import BioEditor from "./bioeditor";
import FriendButton from "./friendbutton";

export default function Profile(props) {
    return (
        <div className="profile">
            <Profilepic
                showUploader={props.showUploader}
                pictureUrl={props.pictureUrl}
                updateProfileUrl={props.updateProfileUrl}
            />

            <div className="profile-wrapper">
                <h1 className="profile-welcome">
                    Welcome, Unicorn-<span>{props.first}</span>{" "}
                </h1>

                {props.bio && <p className="about-padding">About you:</p>}

                {props.bio && (
                    <div className="bio-container">
                        <p className="bio-area"> {props.bio} </p>
                        <p
                            onClick={props.toggleBioEditor}
                            className="to-editor-link"
                        >
                            Edit Bio
                        </p>
                    </div>
                )}

                {!props.bio && (
                    <p
                        onClick={props.toggleBioEditor}
                        className="to-editor-link"
                    >
                        Add Your Bio Now
                    </p>
                )}
            </div>
            {props.bioEditorIsVisible && (
                <BioEditor
                    bio={props.bio}
                    updateBio={props.updateBio}
                    toggleBioEditor={props.toggleBioEditor}
                />
            )}
        </div>
    );
}
