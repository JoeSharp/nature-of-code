import React from "react";

import SortingAlgorithmPicker, {
  useSortingAlgorithmPicker,
} from "./SortingAlgorithmPicker";
import useSketch from "src/components/p5/P5Sketch/useSketch";
import SortingSketch from "./SortingSketch";
import { SortStage } from "./types";
import useItemInArray from "src/components/lib/useLoopCounter/useItemInArray";
import useSortedData from "./useSortedData";
import { useToggledInterval } from "src/components/lib/useInterval";

const Sorting: React.FunctionComponent = () => {
  const {
    algorithm,
    componentProps: algorithmPickerProps,
  } = useSortingAlgorithmPicker("form-control");

  const {
    sortingData: { stages },
  } = useSortedData({ algorithm });

  const { updateConfig, sketchContainer, refContainer } = useSketch(
    SortingSketch
  );
  const {
    index,
    item: sortStage,
    reset,
    stepBackward,
    stepForward,
  } = useItemInArray<SortStage<string>>({ items: stages });

  // Whenever the sort is redone, tell the sketch
  React.useEffect(() => {
    updateConfig({ sortStage });
  }, [sortStage, updateConfig]);

  React.useEffect(() => {
    reset();
    sketchContainer.reset();
  }, [reset, sketchContainer, algorithm]);

  // Only auto iterate forward if we aren't on the final step
  const autoStepForward = React.useCallback(() => {
    if (index < stages.length - 1) {
      stepForward();
    }
  }, [index, stages.length, stepForward]);

  const {
    isAutoIterating,
    onChange: onAutoIterateChange,
  } = useToggledInterval({ iterate: autoStepForward, interval: 500 });

  return (
    <div>
      <h1>Sorting Algorithms</h1>

      <form>
        <div className="form-group">
          <label>Choose Algorithm</label>
          <SortingAlgorithmPicker {...algorithmPickerProps} />
        </div>
      </form>

      <h2>{!!algorithm ? algorithm.name : "please select algorithm"}</h2>
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isAutoIterating}
            onChange={onAutoIterateChange}
            id="chkAutoIterate"
          />
          <label className="form-check-label" htmlFor="chkAutoIterate">
            Auto Iterate
          </label>
        </div>
        <button className="btn btn-danger" onClick={reset}>
          Reset
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={stepBackward}>
          Back
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={stepForward}>
          Forward
        </button>
      </div>

      <div ref={refContainer} />
    </div>
  );
};

export default Sorting;
