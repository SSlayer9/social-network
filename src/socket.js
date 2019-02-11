import * as io from "socket.io-client";

import { onlineUsers } from "./actions";

let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();
        //  front end code goes here
        //receives messages FROM Backend

        // FOR Project
        socket.on("onlineUsers", function(users) {
            console.log("user: ", user);
            store.dispatch(onlineUsers());
        });

        // socket.on("userJoines", user => {
        //     store.disptch(otherActionCreatername());
        // });

        // socket.on("userLeft", user => {
        //     store.dispatch(actionCreator());
        // });
    }
}
