import React from "react";

import { storiesOf } from "@storybook/react";
import P5Sketch from "./P5Sketch";
import sketches from "../sketches";

const stories = storiesOf("p5/P5 Sketch", module);

Object.entries(sketches)
  .map((k) => ({
    name: k[0],
    sketch: k[1],
  }))
  .forEach(({ name, sketch }) =>
    stories.add(name, () => <P5Sketch sketch={sketch} />)
  );
