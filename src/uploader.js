import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }
    async uploadFile(e) {
        try {
            var file = document.getElementById("file");
            var uploadedFile = file.files[0];
            var formData = new FormData();

            // attach inputs to formData
            formData.append("file", uploadedFile);

            const response = await axios.post("/upload", formData);
            this.props.updateProfileUrl(response.data.url);

            //Clear Input
            file.value = "";
        } catch (err) {
            console.log(err.message);
        }
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }
    render() {
        return (
            <div className="upload-modal">
                <h1> Upload a Profile Pic</h1>
                <input
                    type="file"
                    accept="image/*"
                    id="file"
                    onChange={this.handleChange}
                />
                <button onClick={this.uploadFile}>Upload</button>
            </div>
        );
    }
}
