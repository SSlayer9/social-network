import React from "react";
import axios from "./axios";

export default class Wall extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
        this.getUsers = this.getUsers.bind(this);
    }

    componentWillMount() {
        this.getUsers();
    }

    getUsers() {
        axios

            .get("https://randomuser.me/api/?results=7")

            .then(response =>
                response.data.results.map(user => ({
                    name: `${user.name.first} ${user.name.last}`,
                    username: `${user.login.username}`,
                    email: `${user.email}`,
                    image: `${user.picture.thumbnail}`
                }))
            )
            .then(users => {
                this.setState({
                    users
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    render() {
        console.log("STATE USERS:", this.state);
        const { users } = this.state;
        return (
            <div className="feeds-container">
                {users.map(user => {
                    const { username, name, email, image } = user;
                    return (
                        <div key={username} className="comment">
                            <p>{name}</p>
                            <div className="comment-body">
                                <div>
                                    <img src={image} alt={name} />
                                </div>
                                <p>{email}</p>
                            </div>
                            <hr />
                        </div>
                    );
                })}
            </div>
        );
    }
}
