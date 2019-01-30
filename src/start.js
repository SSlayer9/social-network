import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Homepage from "./homepage";

let component;

if (location.pathname == "/welcome") {
    component = <Welcome />;
} else {
    // component = <img src="/assets/logo.png" />;
    component = <Homepage />;
}

ReactDOM.render(component, document.querySelector("main"));
