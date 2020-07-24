import React from "react";
import { storiesOf } from "@storybook/react";

import Sorting from "./Sorting";

const TestHarness: React.FunctionComponent = () => {
  return <Sorting />;
};

storiesOf("alevel/algorithms/sorting/Sorting", module).add("basic", () => (
  <TestHarness />
));
