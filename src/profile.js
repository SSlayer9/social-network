import React from "react";
import Profilepic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    return (
        <div className="profile">
            <Profilepic
                showUploader={props.showUploader}
                pictureUrl={props.pictureUrl}
                updateProfileUrl={props.updateProfileUrl}
            />
            <div className="profile-wrapper">
                <h1>
                    Welcome, <span>{props.first}</span>{" "}
                </h1>
                {props.bio && (
                    <div>
                        <p> {props.bio} </p>
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

                {props.bioEditorIsVisible && (
                    <BioEditor
                        bio={props.bio}
                        updateBio={props.updateBio}
                        toggleBioEditor={props.toggleBioEditor}
                    />
                )}
            </div>
        </div>
    );
}
