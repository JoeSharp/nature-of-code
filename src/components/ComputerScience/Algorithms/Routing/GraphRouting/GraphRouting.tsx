import React from "react";

import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

import GraphBuilder, { useGraphBuilder } from "../../../GraphBuilder";
import useRoutingAlgorithm from "../useRoutingAlgorithm";
import VertexPicker, { usePicker } from "../../../GraphBuilder/VertexPicker";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";
import RouteObserverStage from "../RouteObserverStage";
import HeuristicCostTable from "src/components/ComputerScience/GraphBuilder/HeuristicCostTable";

const initialGraph = new Graph<string>()
  .addBiDirectionalEdge("S", "A", 7)
  .addBiDirectionalEdge("S", "B", 2)
  .addBiDirectionalEdge("S", "C", 3)
  .addBiDirectionalEdge("A", "D", 4)
  .addBiDirectionalEdge("A", "B", 3)
  .addBiDirectionalEdge("B", "D", 4)
  .addBiDirectionalEdge("B", "H", 1)
  .addBiDirectionalEdge("C", "L", 2)
  .addBiDirectionalEdge("D", "F", 5)
  .addBiDirectionalEdge("E", "K", 5)
  .addBiDirectionalEdge("E", "G", 2)
  .addBiDirectionalEdge("F", "H", 3)
  .addBiDirectionalEdge("G", "H", 2)
  .addBiDirectionalEdge("I", "L", 4)
  .addBiDirectionalEdge("I", "K", 4)
  .addBiDirectionalEdge("J", "L", 4)
  .addBiDirectionalEdge("J", "K", 4);

const GraphRouting: React.FunctionComponent = () => {
  const graphBuilder = useGraphBuilder(initialGraph);
  const {
    version,
    graph,
    sketchUse: {
      sketchContainer,
      sketchInUse,
      config: { getKey },
    },
  } = graphBuilder;

  const { vertex: sourceNode, componentProps: sourcePickerProps } = usePicker(
    version,
    graph,
    "form-control"
  );
  const {
    vertex: destinationNode,
    componentProps: destinationPickerProps,
  } = usePicker(version, graph, "form-control");

  const getPositionOfNode = React.useCallback(
    (d: string) => {
      const boid = sketchContainer.getBoid(d);
      return !!boid ? boid.position : undefined;
    },
    [sketchContainer]
  );

  const {
    path,
    stages,
    onHarvestDistances,
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
    graph.vertices.forEach((v) => {
      if (sourceNode === v || destinationNode === v) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setColour(v, "green");
      } else if (path.includes(v)) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setColour(v, "red");
      } else {
        sketchContainer.setBorderWeight(v, 1);
        sketchContainer.setColour(v, "blue");
      }
    });
  }, [sourceNode, destinationNode, graph, path, sketchContainer, sketchInUse]);

  return (
    <div>
      <h1>Routing Algorithms - Using Graph</h1>

      <h2>Choose Endpoints</h2>
      <form>
        <div className="form-group">
          <label>Source</label>
          <VertexPicker {...sourcePickerProps} />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <VertexPicker {...destinationPickerProps} />
        </div>
      </form>
      <button className="btn btn-primary" onClick={onHarvestDistances}>
        Harvest Distances
      </button>

      <HeuristicCostTable heuristicCostsById={heuristicCosts} />

      <SteppingControls {...steppingControlProps} />

      {currentStage && (
        <div className="mt-3">
          <RouteObserverStage
            vertexToString={graph.vertexToString}
            currentStage={currentStage}
          />
        </div>
      )}

      <GraphBuilder graphBuilder={graphBuilder} />
    </div>
  );
};

export default GraphRouting;
