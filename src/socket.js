import * as io from "socket.io-client";

import { allOnlineUsers, userWhoJoined, userWhoLeft } from "./actions";

let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();

        //receiving now messages FROM Backend

        socket.on("onlineUsers", function(message) {
            store.dispatch(allOnlineUsers(message));
        });

        socket.on("userJoinded", function(message) {
            store.dispatch(userWhoJoined(message));
        });

        socket.on("userLeft", function(message) {
            store.dispatch(userWhoLeft(message));
        });
    }
}
