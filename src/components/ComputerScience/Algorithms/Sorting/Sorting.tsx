import React from "react";

import SortingAlgorithmPicker, {
  usePicker as useSortingAlgorithmPicker,
} from "./SortingAlgorithmPicker";
import useSketch from "src/components/p5/useSketch";
import SortingSketch from "./SortingSketch";
import useSortedData from "./useSortedData";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";
import GraphSketch from "../../DataStructures/GraphManager/GraphSketch";
import { GraphSketchConfig } from "../../DataStructures/GraphManager/GraphBuilder/types";
import { SortStageType, SplitListVertex } from "./types";
import { StringDataItem } from "src/components/p5/Boid/types";
import BinaryTreeSketch from "../../BinaryTreeBuilder/BinaryTreeSketch";
import { Config as BinaryTreeSketchConfig } from "../../BinaryTreeBuilder/types";

const Sorting: React.FunctionComponent = () => {
  const {
    algorithm,
    componentProps: algorithmPickerProps,
  } = useSortingAlgorithmPicker("form-control");

  const { stages } = useSortedData({ algorithm });

  const {
    item: sortStage,
    componentProps: steppingControlProps,
  } = useSteppingControls(stages);
  const { goToFirst } = steppingControlProps;

  const { updateConfig, sketchContainer, refContainer } = useSketch(
    SortingSketch
  );

  const {
    updateConfig: updateSplitConfig,
    refContainer: splitRefContainer,
  } = useSketch<
    BinaryTreeSketchConfig<SplitListVertex<StringDataItem>>,
    BinaryTreeSketch<SplitListVertex<StringDataItem>>
  >(BinaryTreeSketch);

  const {
    updateConfig: updateJoinConfig,
    refContainer: joinRefContainer,
  } = useSketch<
    GraphSketchConfig<SplitListVertex<StringDataItem>>,
    GraphSketch<SplitListVertex<StringDataItem>>
  >(GraphSketch);

  React.useEffect(() => {
    if (
      sortStage !== undefined &&
      sortStage.type === SortStageType.observation
    ) {
      updateJoinConfig({ graph: sortStage.joinNodes });
      updateSplitConfig({
        binaryTree: sortStage.splitNodes,
        toString: (d: SplitListVertex<StringDataItem>) => d.label,
        // `[${d.key}] ${d.label}`,
      });
    }
  }, [sortStage, updateJoinConfig, updateSplitConfig]);

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
      </form>

      <h2>{!!algorithm ? algorithm.name : "please select algorithm"}</h2>
      <SteppingControls {...steppingControlProps} />
      <div ref={refContainer} />
      <h2>Split Data</h2>
      <div ref={splitRefContainer} />
      <h2>Join Data</h2>
      <div ref={joinRefContainer} />
    </div>
  );
};

export default Sorting;
