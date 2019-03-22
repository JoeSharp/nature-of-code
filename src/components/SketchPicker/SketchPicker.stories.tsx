import * as React from "react";

import { useState } from "react";

import { storiesOf } from "@storybook/react";
import SketchPicker from "./SketchPicker";

const TestHarness = () => {
  const [value, onChange] = useState<string | undefined>(undefined);

  return (
    <div>
      <SketchPicker {...{ onChange, value }} />
      <p>You picked: {value}</p>
    </div>
  );
};

storiesOf("Sketch Picker", module).add("basic", () => <TestHarness />);
