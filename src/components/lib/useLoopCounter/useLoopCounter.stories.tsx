import React from "react";
import { storiesOf } from "@storybook/react";

import useLoopCounter from "./useLoopCounter";

const TestHarness: React.FunctionComponent = () => {
  const min: number = 5;
  const max: number = 10;
  const { count, increment, decrement } = useLoopCounter({ min, max });
  const [amount, setAmount] = React.useState<number>(1);

  const onAmountChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setAmount(parseInt(value)),
    [setAmount]
  );
  const onClickIncrement: React.MouseEventHandler = React.useCallback(
    () => increment(amount),
    [amount, increment]
  );
  const onClickDecrement: React.MouseEventHandler = React.useCallback(
    () => decrement(amount),
    [amount, decrement]
  );

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Amount</label>
          <input
            className="form-control"
            value={amount}
            onChange={onAmountChange}
          />
        </div>
        <div className="form-group">
          <label>Min</label>
          <input className="form-control" readOnly value={min} />
        </div>
        <div className="form-group">
          <label>Max</label>
          <input className="form-control" readOnly value={max} />
        </div>
        <div className="form-group">
          <label>Count</label>
          <input className="form-control" readOnly value={count} />
        </div>
      </form>

      <div className="btn-group">
        <button className="btn btn-danger" onClick={onClickDecrement}>
          Decrement
        </button>
        <button className="btn btn-primary" onClick={onClickIncrement}>
          Increment
        </button>
      </div>
    </div>
  );
};

storiesOf("lib/useLoopCounter", module).add("basic", () => <TestHarness />);
