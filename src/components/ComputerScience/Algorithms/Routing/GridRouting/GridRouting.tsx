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
import p5 from "p5";

const GridRouting: React.FunctionComponent = () => {
  const { refContainer, updateConfig, sketchContainer } = useSketch(GridSketch);

  const {
    config: { getKey },
  } = sketchContainer;

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
    getKey,
    getPositionOfNode: React.useCallback(
      (d: p5.Vector) => {
        const boid = sketchContainer.getBoid(d);
        return !!boid ? boid.position : undefined;
      },
      [sketchContainer]
    ),
  });

  const {
    item: currentStage,
    componentProps: steppingControlProps,
  } = useSteppingControls(stages);

  React.useEffect(() => {
    updateConfig({
      graph,
      path: currentStage !== undefined ? currentStage.pathFrom : [],
      toggleConnection,
    });
  }, [currentStage, graph, updateConfig, toggleConnection]);

  return (
    <div>
      <h1>Routing Algorithms - Using Grids</h1>

      <div ref={refContainer} />

      <SteppingControls {...steppingControlProps} />

      {currentStage && (
        <RouteObserverStage
          vertexToString={graph.vertexToString}
          currentStage={currentStage}
        />
      )}
    </div>
  );
};

export default GridRouting;
