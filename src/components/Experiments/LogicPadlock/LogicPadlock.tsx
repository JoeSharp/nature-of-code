import * as React from "react";

import GuessEntry from "./GuessEntry";
import {
  IGuess,
  IClueWithValue,
  allDigitsWrong,
  oneDigitInCorrectPlace,
  oneDigitInWrongPlace,
  twoDigitsInWrongPlace,
} from "./types";
import Clue from "./Clue";

const cluesWithValues: IClueWithValue[] = [
  {
    clue: oneDigitInCorrectPlace,
    value: [6, 8, 2],
  },
  {
    clue: oneDigitInWrongPlace,
    value: [6, 1, 4],
  },
  {
    clue: twoDigitsInWrongPlace,
    value: [2, 0, 6],
  },
  {
    clue: allDigitsWrong,
    value: [7, 3, 8],
  },
  {
    clue: oneDigitInWrongPlace,
    value: [3, 8, 0],
  },
];

const LogicPadlock: React.FunctionComponent = () => {
  const [guess, setGuess] = React.useState<IGuess>([0, 0, 0]);

  return (
    <div>
      <h1>Logic Padlock</h1>
      <p>Can you open the lock using these clues?</p>
      {cluesWithValues.map((clueWithValue) => (
        <Clue guess={guess} clueWithValue={clueWithValue} />
      ))}
      <p>Set your guess here</p>
      <GuessEntry numberDigits={3} value={guess} onChange={setGuess} />
      <div>Guess: {guess}</div>
    </div>
  );
};

export default LogicPadlock;
