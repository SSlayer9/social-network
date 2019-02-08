import React from "react";
import axios from "./axios";

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

    async submitBio() {
        try {
            const response = await axios.post("/userbio", {
                bio: this.state.bio
            });
            this.props.updateBio(response.data);
            this.props.toggleBioEditor();
        } catch (err) {
            console.log(err.message);
        }
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
