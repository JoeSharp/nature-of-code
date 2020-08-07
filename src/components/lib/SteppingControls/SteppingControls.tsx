import React from "react";
import { useToggledInterval, UseToggledInterval } from "../useInterval";
import useItemInArray from "../useLoopCounter/useItemInArray";

interface Props<T> extends UseToggledInterval {
  index: number;
  items: T[];
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
}

const SteppingControls = <T,>({
  index,
  items,
  isAutoIterating,
  setIsAutoIterating,
  stepForward,
  stepBackward,
  reset,
}: Props<T>) => (
  <div>
    <h4>Stepping Through Stages</h4>
    <p>
      Step {index} of {items.length}
    </p>
    <div>
      {isAutoIterating ? (
        <React.Fragment>
          <button
            className="btn btn-danger mr-2"
            onClick={() => setIsAutoIterating(false)}
          >
            <span className="oi oi-media-stop"></span>
          </button>
          <span>Auto Stepping</span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button className="btn btn-danger mr-2" onClick={reset}>
            <span className="oi oi-media-skip-backward"></span>
          </button>
          <button className="btn btn-primary mr-2" onClick={stepBackward}>
            <span className="oi oi-media-step-backward"></span>
          </button>
          <button className="btn btn-primary mr-2" onClick={stepForward}>
            <span className="oi oi-media-step-forward"></span>
          </button>
          <button
            className="btn btn-primary mr-2"
            onClick={() => setIsAutoIterating(true)}
          >
            <span className="oi oi-media-skip-forward"></span>
          </button>
        </React.Fragment>
      )}
    </div>
  </div>
);

interface UseSteppingControls<T> {
  index: number;
  item: T;
  componentProps: Props<T>;
}

export const useSteppingControls = <T,>(items: T[]): UseSteppingControls<T> => {
  const { item, index, reset, stepForward, stepBackward } = useItemInArray({
    items,
  });

  // Only auto iterate forward if we aren't on the final step
  const autoStepForward = React.useCallback(() => {
    if (index < items.length - 1) {
      stepForward();
    }
  }, [index, items.length, stepForward]);

  const toggledInterval = useToggledInterval({
    iterate: autoStepForward,
    interval: 500,
  });

  return {
    index,
    item,
    componentProps: {
      ...toggledInterval,
      index,
      items,
      reset,
      stepForward,
      stepBackward,
    },
  };
};

export default SteppingControls;
