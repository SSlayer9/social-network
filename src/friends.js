import React from "react";
import {
    receiveFriendsAndWannabes,
    acceptFriendship,
    endFriendship
} from "./actions";
import { connect } from "react-redux";

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveFriendsAndWannabes());
    }

    TODO: // chekc this render function!!!!!!!!!!! NOT WORKING!
    render() {
        return  (

     const wannabeList = wannabes.map((wannabe => {
         <li key={wannabe.id}>{wannabe.first} {wannabe.last}</li>
             <img src={wannabe.url} />
             <button onCLick={e => this.props.dispatch(acceptFriendship(wannabe.id))}> Accept</button>
        }))

        const friends = friends.map((friend => {
                 <div key={friend.id}>
                     <img src={friend.url}></img>
                     <p> {friend.first} {friend.last}</p>
                     <button onClick={e => this.props.dispatch(endFriendship(friend.id))}></button>
                 </div>
             }))

        )
    
        
        
    <p>Hi, I am the friends page!</p>;
    
}

const mapStateToProps = function(state) {
    console.log("STATE:", state);
    return {
        wannabes:
            state.friendslist &&
            state.friendslist.filter(friend => friend.accepted == false),

        friends:
            state.friendslist &&
            state.friendslist.filter(friend => friend.accepted == true)
    };
};
export default connect(mapStateToProps)(Friends);
