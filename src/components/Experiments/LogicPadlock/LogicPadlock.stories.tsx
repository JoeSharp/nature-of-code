import React from "react";

import { storiesOf } from "@storybook/react";

import LogicPadlock from "./LogicPadlock";

import "./styles.css";

storiesOf("Experiments/Logic Padlock/Logic Padlock", module).add(
  "basic",
  () => <LogicPadlock />
);
