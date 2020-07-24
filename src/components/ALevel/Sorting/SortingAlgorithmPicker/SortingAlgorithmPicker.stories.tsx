import React from "react";

import { storiesOf } from "@storybook/react";
import SortingAlgorithmPicker from "./SortingAlgorithmPicker";
import { NamedSort } from "ocr-cs-alevel-ts/dist/types";

const TestHarness = () => {
  const [value, onChange] = React.useState<NamedSort | undefined>(undefined);

  return (
    <div>
      <SortingAlgorithmPicker {...{ onChange, value }} />
      <p>You picked: {value}</p>
    </div>
  );
};

storiesOf(
  "alevel/algorithms/sorting/SortingAlgorithmPicker",
  module
).add("basic", () => <TestHarness />);
