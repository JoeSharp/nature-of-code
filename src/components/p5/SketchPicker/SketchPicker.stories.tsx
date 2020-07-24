import React from "react";

import { storiesOf } from "@storybook/react";
import SketchPicker from "./SketchPicker";
import sketches from "../sketches";

const TestHarness = () => {
  const [value, onChange] = React.useState<string | undefined>(undefined);

  return (
    <div>
      <SketchPicker {...{ sketches, onChange, value }} />
      <p>You picked: {value}</p>
    </div>
  );
};

storiesOf("p5/Sketch Picker", module).add("basic", () => <TestHarness />);
