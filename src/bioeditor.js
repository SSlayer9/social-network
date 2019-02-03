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

    // updateBio(bio) {
    //     this.setState({
    //         bio
    //     });
    // }

    submitBio() {
        console.log("Submit Bio:", this.state.bio);
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
            <div>
                <textarea
                    name="bio"
                    type="text"
                    value={this.state.bio}
                    onChange={this.handleChange}
                />
                {/* {props.bio && <button onClick={this.saveBio}>Edit Bio</button>} */}
                <button onClick={this.submitBio}>Save Bio</button>
            </div>
        );
    }
}
// ------------------------------
// {
//     !props.bio && (
//         <p onClick={props.toggleBioEditor} className="addbio-link">
//             Add Your Bio Now
//         </p>
//     );
// }
