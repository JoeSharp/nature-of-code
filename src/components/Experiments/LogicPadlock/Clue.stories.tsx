import * as React from "react";

import { storiesOf } from "@storybook/react";

import Clue from "./Clue";
import { allDigitsWrong, twoDigitsInWrongPlace } from "./types";

import "./styles.css";

storiesOf("Experiments/Logic Padlock/Clue", module)
  .add("allDigitsWrong - YES", () => (
    <Clue
      clueWithValue={{ clue: allDigitsWrong, value: [7, 3, 8] }}
      guess={[9, 2, 1]}
    />
  ))
  .add("allDigitsWrong - NO", () => (
    <Clue
      clueWithValue={{ clue: allDigitsWrong, value: [9, 3, 8] }}
      guess={[9, 2, 1]}
    />
  ))
  .add("twoDigitsInWrongPlace - YES", () => (
    <Clue
      clueWithValue={{ clue: twoDigitsInWrongPlace, value: [9, 4, 7] }}
      guess={[7, 4, 1]}
    />
  ));
