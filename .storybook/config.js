import { configure } from "@storybook/react";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
