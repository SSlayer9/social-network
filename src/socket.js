import * as io from "socket.io-client";
import { createStore } from "redux";

let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();
        //  front end code goes here
        //receives messages FROM Backend
        socket.on("myFirstEmit", function(message) {
            console.log("message in socketon:", message);
        });

        socket.on("myBroadcast", function(payload) {
            console.log("my Broadcast:", payload);
        });

        socket.on("EveryoneReceivesthis", function(data) {
            console.log("emit to All:", data);
        });

        // FORPRoject
        socket.on("onlineUsers", function(data) {
            createStore.dispatch(nameActionCreatorFunctio());
        });

        socket.on("userJoindes", user => {
            store.disptch(otherActionCreatername());
        });

        socket.on("userLeft", user => {
            store.dispatch(actionCreator());
        });
    }
}
