import * as React from "react";

import { storiesOf } from "@storybook/react";

import { IGuess } from "./types";
import GuessEntry from "./GuessEntry";

import "./styles.css";

storiesOf("Experiments/Logic Padlock/Guess Entry", module)
  .add("valid", () => {
    const [guess, setGuess] = React.useState<IGuess>([0, 0, 0]);

    return (
      <div>
        <GuessEntry numberDigits={3} value={guess} onChange={setGuess} />
        <div>{guess}</div>
      </div>
    );
  })
  .add("invalid", () => {
    const [guess, setGuess] = React.useState<IGuess>([0, 0, 0]);

    return <GuessEntry numberDigits={5} value={guess} onChange={setGuess} />;
  });
