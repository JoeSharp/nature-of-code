import React from "react";
import useSketch from "src/components/p5/useSketch";
import GridSketch from "./GridSketch";
import useGridGraph from "./useGridGraph";
import useRoutingAlgorithm from "../GraphRouting/useRoutingAlgorithm";
import useItemInArray from "src/components/lib/useLoopCounter/useItemInArray";
import { useToggledInterval } from "src/components/lib/useInterval";

const GridRouting: React.FunctionComponent = () => {
  const { refContainer, updateConfig } = useSketch(GridSketch);

  const {
    version,
    graph,
    topLeft: sourceNode,
    bottomRight: destinationNode,
    toggleConnection,
  } = useGridGraph({
    rows: 8,
    columns: 15,
  });

  const { stages } = useRoutingAlgorithm({
    version,
    graph,
    sourceNode,
    destinationNode,
  });

  const { index, item: stage, stepForward, stepBackward } = useItemInArray({
    items: stages,
  });

  // Only auto iterate forward if we aren't on the final step
  const autoStepForward = React.useCallback(() => {
    if (index < stages.length - 1) {
      stepForward();
    }
  }, [index, stages.length, stepForward]);

  const {
    isAutoIterating,
    onChange: onAutoIterateChange,
  } = useToggledInterval({ iterate: autoStepForward, interval: 100 });

  React.useEffect(() => {
    updateConfig({ graph, path: stage.pathFrom, toggleConnection });
  }, [stage, graph, updateConfig, toggleConnection]);

  console.log("Stages", { length: stages.length, index });

  return (
    <div>
      <h1>Routing Algorithms - Using Grids</h1>

      <form>
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
          </label>{" "}
        </div>
      </form>

      <div className="btn-group">
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

export default GridRouting;
