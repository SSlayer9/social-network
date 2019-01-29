import React from "react";
import Axios from "axios";

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    handleChange(e) {
this.[e.target.name] = e.target.value;
    }
    submit() {
        axios.post('/register', {
            first: this.first,
            email: this.email
        }).then(({data}) => {
            if (data.success) {
              TODO:  location.replace('/');
            } else {
                this.setState({
                    error: true
                });
            }
        })
    }
    render() {
        return (
            <div>
                {this.state.error && <div className='error'>Oops! Something went wrong!</div>}
                <input name="first" onChange={this.handleChange} />
                <input name="last" />
                <input name="email" />
                <input name="pass" />
                <input />
                <button onClick>REgister</button>
            </div>
        );
    }
}

export function Welcome() {
    return (
        <div>
            <Registration />
        </div>
    );
}
