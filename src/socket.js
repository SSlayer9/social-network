import * as io from "socket.io-client";

import {
    allOnlineUsers,
    userWhoJoined,
    userWhoLeft,
    showMessages,
    showNewMessage
} from "./actions";

let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();

        //receiving now messages FROM Backend

        socket.on("onlineUsers", function(message) {
            store.dispatch(allOnlineUsers(message));
        });

        socket.on("userJoined", function(message) {
            store.dispatch(userWhoJoined(message));
        });

        socket.on("userLeft", function(message) {
            store.dispatch(userWhoLeft(message));
        });

        socket.on("allMessages", function(data) {
            store.dispatch(showMessages(data.messages));
        });

        socket.on("chatMessage", function(data) {
            console.log("happeining in socket.js data", data);
            store.dispatch(showNewMessage(data.message));
        });
    }
    return socket;
}
