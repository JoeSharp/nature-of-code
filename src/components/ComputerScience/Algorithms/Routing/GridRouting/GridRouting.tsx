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
import HeuristicCostTable from "src/components/ComputerScience/GraphBuilder/HeuristicCostTable";

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

  const getPositionOfNode = React.useCallback(
    (d: p5.Vector) => {
      const boid = sketchContainer.getBoid(d);
      return !!boid ? boid.position : undefined;
    },
    [sketchContainer]
  );

  const {
    stages,
    onHarvestDistances,
    onResetDistances,
    heuristicCosts,
  } = useRoutingAlgorithm({
    version,
    graph,
    sourceNode,
    destinationNode,
    getKey,
    getPositionOfNode,
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
      <div ref={refContainer} />

      <div className="mb-3">
        <p>
          The A* algorithm is an enchancement on Dijkstras. It takes into
          account the estimated distance from a given node to the endpoint when
          calculating the cost for it's priority queue. To make use of this
          enhancement, click on 'Harvest Distances' and the euclidean distances
          from each node to the destination will be calculated and used as part
          of the routing algorithm.
        </p>
        <button className="btn btn-primary mr-2" onClick={onHarvestDistances}>
          Harvest Distances
        </button>
        <button className="btn btn-danger" onClick={onResetDistances}>
          Reset Distances
        </button>
      </div>

      <HeuristicCostTable heuristicCostsById={heuristicCosts} />

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
