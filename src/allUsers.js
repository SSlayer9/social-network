import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";

export default class AllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.id,
            allUsers: []
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get("/allmembers");
            // this.setState({
            //     allUsers: response.data
            // });
            // const users = response.dats;
            console.log("Respone ALL USERS:", response);
            console.log("All Users now??", users);
            const users = response.data.allUsers.map(user => ({
                first: `${user.first}`,
                last: `${user.last}`,
                url: `${user.url}`,
                id: `${user.id}`
            }));
            this.setState({
                allUsers: users
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        console.log("STATE Allusers: ", this.state);
        const { allUsers } = this.state;

        return (
            <div className="all-user-wrapper">
                {allUsers.map(user => {
                    const { first, last, url, id } = user;
                    var pic;
                    if (user.url == null) {
                        pic = "/assets/default-img.png";
                    } else {
                        pic = user.url;
                    }
                    return (
                        <div key={id} className="wannabe-container">
                            <img
                                src={user.url || "assets/default-img.png"}
                                className="wannabe-img"
                            />
                            <p>
                                {first} {last}
                            </p>
                            <div className="btn-all-users">
                                <FriendButton otherUserId={id} />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
} //closes class Allusers
