import * as React from "react";

import { storiesOf } from "@storybook/react";
import P5SketchLibrary from "./P5SketchLibrary";
import sketches from "../sketches";

storiesOf("p5/Sketch Library", module).add("all", () => (
  <P5SketchLibrary sketches={sketches} />
));
