import React from "react";

import SortingAlgorithmPicker, {
  useSortingAlgorithmPicker,
} from "./SortingAlgorithmPicker";
import useSketch from "src/components/p5/P5Sketch/useSketch";
import SortingSketch from "./SortingSketch";
import { SortStage } from "./types";
import useItemInArray from "src/components/lib/useLoopCounter/useItemInArray";
import useSortedData from "./useSortedData";

const Sorting: React.FunctionComponent = () => {
  const {
    algorithm,
    componentProps: algorithmPickerProps,
  } = useSortingAlgorithmPicker();

  const {
    sortingData: { stages },
  } = useSortedData({ algorithm });

  const { updateConfig, sketchContainer, refContainer } = useSketch(
    SortingSketch
  );
  const { item: sortStage, reset, stepBackward, stepForward } = useItemInArray<
    SortStage<string>
  >({ items: stages });

  // Whenever the sort is redone, tell the sketch
  React.useEffect(() => {
    updateConfig({ sortStage });
  }, [sortStage, updateConfig]);

  React.useEffect(() => {
    reset();
    sketchContainer.reset();
  }, [reset, sketchContainer, algorithm]);

  return (
    <div>
      <h1>Sorting Algorithms</h1>

      <form>
        <label>Choose Algorithm</label>
        <SortingAlgorithmPicker {...algorithmPickerProps} />
      </form>

      <h2>{!!algorithm ? algorithm.name : "please select algorithm"}</h2>
      <div>
        <button className="btn btn-danger" onClick={reset}>
          Reset
        </button>
        <button className="btn btn-primary" onClick={stepBackward}>
          Back
        </button>
        <button className="btn btn-primary" onClick={stepForward}>
          Forward
        </button>
      </div>

      <div ref={refContainer} />
    </div>
  );
};

export default Sorting;
