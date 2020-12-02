import {
  arithmeticComparator,
  generateRandomNumbers,
} from "comp-sci-maths-lib/dist/common";
import React from "react";
import useInterval from "src/components/lib/useInterval";
import { BigOMeasurements, MeasureProps } from "./types";

interface Props extends MeasureProps {
  algorithmWrapper: (inputList: number[]) => number;
}

interface ReducerState extends MeasureProps {
  algorithmWrapper: (inputList: number[]) => number;
  currentLength: number;
  measurements: BigOMeasurements;
}

interface TickAction {
  type: "tick";
}
interface ResetAction extends MeasureProps {
  type: "reset";
  algorithmWrapper: (inputList: number[]) => number;
}

type ReducerAction = TickAction | ResetAction;

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case "tick":
      if (state.currentLength <= state.endSize) {
        const inputList: number[] = generateRandomNumbers(
          0,
          1000,
          state.currentLength
        );
        inputList.sort(arithmeticComparator);

        // Search for some specific indices
        let numberOfComparisons: number = state.algorithmWrapper(inputList);

        let currentLength = state.currentLength;
        if (
          (state.measurements[state.currentLength] || []).length > state.samples
        ) {
          currentLength += state.step;
        }

        return {
          ...state,
          currentLength,
          measurements: {
            ...state.measurements,
            [state.currentLength]: [
              numberOfComparisons,
              ...(state.measurements[state.currentLength] || []),
            ],
          },
        };
      } else {
        return state;
      }
    case "reset":
      const resetAction = action as ResetAction;
      return {
        ...resetAction,
        currentLength: resetAction.startSize,
        measurements: {},
      };
  }
};

const useAlgorithmMeasure = ({
  startSize,
  endSize,
  samples,
  step,
  algorithmWrapper,
}: Props): BigOMeasurements => {
  const [{ measurements }, dispatch] = React.useReducer(reducer, {
    algorithmWrapper,
    currentLength: startSize,
    measurements: {},
    startSize,
    endSize,
    samples,
    step,
  });

  const tick = React.useCallback(() => dispatch({ type: "tick" }), []);

  React.useEffect(
    () =>
      dispatch({
        type: "reset",
        startSize,
        endSize,
        samples,
        step,
        algorithmWrapper,
      }),
    [algorithmWrapper, samples, startSize, endSize, step]
  );

  useInterval(tick, 1);

  return measurements;
};

export default useAlgorithmMeasure;
