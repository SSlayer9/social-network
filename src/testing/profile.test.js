import React from "react";

import App from "./app";
import Profile from "../profile";
import Profilepic from "./ProfilePic";
import BioEditor from "./BioEditor";
import { shallow } from "enzyme";

// When no bio is passed to it, an "Add" button is rendered.
test("no bio there should display add bio button", () => {
    const wrapper = shallow(<Profile bio={null} />);

    expect(wrapper.find("p").contains("Add Your Bio Now")).toBe(true);
});

// When a bio is passed to it, an "Edit" button is rendered.

test("bio is there, edit button is rendered", () => {
    const wrapper = shallow(<Profile bio="Hi" />);

    expect(wrapper.find("p").contains("Edit Bio")).toBe(true);
});

// Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.
