import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
// NOTUSED!!!!!!!!!!!!!!!!!!!!!!!!!
export default class Bio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: props.bio
        }
    }

    
    if ) {
        return (
            <div className="bio-container">
                <p className="bio-area"> {props.bio} </p>
                <Link to="/userbio" onClick={props.toggleBioEditor}>
                    Edit Bio
                </Link>

                {/* <p onClick={props.toggleBioEditor} className="to-editor-link">
                    Edit Bio
                </p> */}
            </div>
        );
    }
    return (
        <p onClick={props.toggleBioEditor} className="to-editor-link">
            Add Your Bio Now
        </p>
    );
}
