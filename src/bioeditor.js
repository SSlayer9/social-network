import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: props.bio,
            bioEditorIsVisible: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleBioEditor = this.toggleBioEditor.bind(this);
        this.submitBio = this.submitBio.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ bio: nextProps.bio });
    }

    handleChange(e) {
        this.setState({
            bio: e.target.value
        });
    }

    toggleBioEditor() {
        this.setState({
            bioEditorIsVisible: !this.state.bioEditorIsVisible
        });
    }

    async submitBio() {
        try {
            const response = await axios.post("/userbio", {
                bio: this.state.bio
            });
            this.props.updateBio(response.data);
            this.toggleBioEditor();
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        return (
            <div>
                {this.props.bio && !this.state.bioEditorIsVisible && (
                    <div className="bio-container">
                        <b>ABOUT</b>
                        <p className="edit-btn" onClick={this.toggleBioEditor}>
                            Edit Bio
                        </p>
                        <p className="bio-text">{this.props.bio}</p>
                        {/* <button onClick={this.toggleBioEditor}>
                            {" "}
                            Edit Bio
                        </button> */}
                    </div>
                )}

                {!this.state.bioEditorIsVisible && !this.props.bio && (
                    <p onClick={this.toggleBioEditor}>Add Bio Now</p>
                )}

                {this.state.bioEditorIsVisible && (
                    <div className="bio-container">
                        <textarea
                            name="bio"
                            type="text"
                            defaultValue={this.state.bio}
                            onChange={this.handleChange}
                            rows="7"
                            cols="25"
                        />

                        <button onClick={this.submitBio}>Save Bio</button>
                    </div>
                )}
            </div>
        );
    }
}
