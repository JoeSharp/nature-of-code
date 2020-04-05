import * as React from "react";

import { storiesOf } from "@storybook/react";

import ValueDisplay from "./ValueDisplay";

import "./styles.css";

storiesOf("Logic Padlock/Value Display", module).add("Value Display", () => (
  <ValueDisplay value={[4, 5, 8]} />
));
