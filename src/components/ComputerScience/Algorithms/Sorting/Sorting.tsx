import React from "react";

import SortingAlgorithmPicker, {
  usePicker as useSortingAlgorithmPicker,
} from "./SortingAlgorithmPicker";
import SortingSketchPicker, {
  usePicker as useSortingSketchPicker,
} from "./SortingSketchPicker";
import useSketch from "src/components/p5/useSketch";
import SortingInPlaceSketch from "./SortingInPlaceSketch";
import SortingRecursionSketch from "./SortingRecursionSketch";
import useSortedData from "./useSortedData";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";
import { SortSketchType } from "./types";

const Sorting: React.FunctionComponent = () => {
  const {
    algorithm,
    componentProps: algorithmPickerProps,
  } = useSortingAlgorithmPicker("form-control");

  const {
    sketchType,
    componentProps: sketchTypeProps,
  } = useSortingSketchPicker("form-control");

  const { stages } = useSortedData({ algorithm });

  const {
    item: sortStage,
    componentProps: steppingControlProps,
  } = useSteppingControls(stages);
  const { goToFirst } = steppingControlProps;

  let whichSketch;
  switch (sketchType) {
    case SortSketchType.inPlace:
      whichSketch = SortingInPlaceSketch;
      break;
    case SortSketchType.recursive:
      whichSketch = SortingRecursionSketch;
      break;
    default:
      whichSketch = SortingInPlaceSketch;
      break;
  }

  const { updateConfig, sketchContainer, refContainer } = useSketch(
    whichSketch
  );

  // Whenever the sort is redone, tell the sketch
  React.useEffect(() => {
    updateConfig({ sortStage });
  }, [sortStage, updateConfig]);

  React.useEffect(() => {
    goToFirst();
    sketchContainer.reset();
  }, [goToFirst, sketchContainer, algorithm]);

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Choose Algorithm</label>
          <SortingAlgorithmPicker {...algorithmPickerProps} />
        </div>
        <div className="form-group">
          <label>Choose Sketch Type</label>
          <SortingSketchPicker {...sketchTypeProps} />
        </div>
      </form>

      <h2>{!!algorithm ? algorithm.name : "please select algorithm"}</h2>
      <SteppingControls {...steppingControlProps} />
      <div ref={refContainer} />
    </div>
  );
};

export default Sorting;
