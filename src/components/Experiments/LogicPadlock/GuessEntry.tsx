import * as React from "react";

import { IGuess } from "./types";

interface Props {
  numberDigits: number;
  value: number[];
  onChange: (v: number[]) => any;
}

interface DigitUpdateAction {
  index: number;
  value: number;
}

const boundValue = (v: number): number => {
  if (v < 0) return 0;
  if (v > 9) return 9;
  return v;
};

const valueReducer = (state: IGuess, action: DigitUpdateAction): IGuess => {
  const { index, value } = action;
  return state.map((v, i) => (i === index ? boundValue(value) : v));
};

interface DigitWithHandlers {
  digit: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const GuessEntry: React.FunctionComponent<Props> = ({
  numberDigits,
  value,
  onChange,
}) => {
  const [digits, dispatchDigits] = React.useReducer(valueReducer, value);

  const digitWithHandlers: DigitWithHandlers[] = React.useMemo(
    () =>
      digits.map((digit, index) => ({
        digit,
        onChange: (e) =>
          dispatchDigits({ value: e.target.valueAsNumber, index }),
      })),
    [digits, dispatchDigits]
  );

  React.useEffect(() => onChange(digits), [digits, onChange]);

  if (value.length != numberDigits) {
    return <div>INVALID NUMBER OF DIGITS</div>;
  }

  return (
    <form className="form-inline">
      {digitWithHandlers.map(({ digit, onChange }) => (
        <div className="form-group">
          <input
            className="form-control"
            type="number"
            value={digit}
            onChange={onChange}
            min={0}
            max={9}
          />
        </div>
      ))}
    </form>
  );
};

export default GuessEntry;
