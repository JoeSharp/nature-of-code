import React from "react";
import useSketch from "src/components/p5/useSketch";
import GridSketch from "./GridSketch";
import useGridGraph from "./useGridGraph";
import useRoutingAlgorithm from "../useRoutingAlgorithm";

import "./routing.css";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";
import RouteObserverStage from "../RouteObserverStage";

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

  const {
    item: currentStage,
    componentProps: steppingControlProps,
  } = useSteppingControls(stages);

  React.useEffect(() => {
    updateConfig({
      graph,
      path: currentStage.pathFrom,
      toggleConnection,
    });
  }, [currentStage.pathFrom, graph, updateConfig, toggleConnection]);

  return (
    <div>
      <h1>Routing Algorithms - Using Grids</h1>

      <div ref={refContainer} />

      <SteppingControls {...steppingControlProps} />

      <RouteObserverStage
        vertexToString={graph.vertexToString}
        currentStage={currentStage}
      />
    </div>
  );
};

export default GridRouting;
