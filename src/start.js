import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let component;

if (location.pathname == "/welcome") {
    component = <Welcome />;
} else {
    component = <img src="/assets/logo.png" />;
}

ReactDOM.render(component, document.querySelector("main"));
