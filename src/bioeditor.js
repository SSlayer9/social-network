import React from "react";
import axios from "./Axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: props.bio
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitBio = this.submitBio.bind(this);
    }

    handleChange(e) {
        this.setState({
            bio: e.target.value
        });
    }

    submitBio() {
        axios
            .post("/userbio", {
                bio: this.state.bio
            })
            .then(
                function(response) {
                    this.props.updateBio(response.data);
                    this.props.toggleBioEditor();
                }.bind(this)
            )
            .catch(err => {
                console.log("Error in BioUpload: ", err);
            });
    }

    render() {
        return (
            <div className="bio-editor-modal">
                <textarea
                    name="bio"
                    type="text"
                    value={this.state.bio}
                    onChange={this.handleChange}
                />

                <button onClick={this.submitBio}>Save Bio</button>
            </div>
        );
    }
}
