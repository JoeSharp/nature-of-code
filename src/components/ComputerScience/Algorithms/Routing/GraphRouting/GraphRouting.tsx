import React from "react";

import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

import GraphBuilder, { useGraphBuilder } from "../../../GraphBuilder";
import useRoutingAlgorithm from "../useRoutingAlgorithm";
import VertexPicker, { usePicker } from "../../../GraphBuilder/VertexPicker";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";
import RouteObserverStage from "../RouteObserverStage";
import p5 from "p5";
import DataItemBoid from "src/components/p5/Boid/DataItemBoid";
import { HeuristicCostFunction } from "comp-sci-maths-lib/dist/algorithms/routing/types";
import { HeuristicCostById } from "src/components/ComputerScience/GraphBuilder/types";
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
    sketchUse: { sketchContainer },
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

  const [heuristicCosts, setHeuristicsCosts] = React.useState<
    HeuristicCostById
  >({});

  const getHeuristicCost: HeuristicCostFunction<string> = React.useCallback(
    (id: string) => heuristicCosts[id] || 0,
    [heuristicCosts]
  );

  const onHarvestDistances = React.useCallback(() => {
    if (destinationNode !== undefined) {
      const destinationBoid: DataItemBoid<string> = sketchContainer.getBoid(
        destinationNode
      );

      const costs: HeuristicCostById = Object.values(sketchContainer.boids)
        .map((boid) => ({
          vertex: boid.entity,
          distance: p5.Vector.sub(
            boid.position,
            destinationBoid.position
          ).mag(),
        }))
        .reduce((acc, curr) => ({ ...acc, [curr.vertex]: curr.distance }), {});

      setHeuristicsCosts(costs);
    }
  }, [sketchContainer, destinationNode, setHeuristicsCosts]);

  const { path, stages } = useRoutingAlgorithm({
    version,
    graph,
    sourceNode,
    destinationNode,
    getHeuristicCost,
  });

  const {
    item: currentStage,
    componentProps: steppingControlProps,
  } = useSteppingControls(stages);

  React.useEffect(() => {
    graph.vertices.forEach((v) => {
      const boid = sketchContainer.getBoid(v);
      if (sourceNode === v || destinationNode === v) {
        boid.borderWeight = 3;
        boid.colour = "green";
      } else if (path.includes(v)) {
        boid.borderWeight = 3;
        boid.colour = "red";
      } else {
        boid.borderWeight = 1;
        boid.colour = "blue";
      }
    });
  }, [sourceNode, destinationNode, graph, path, sketchContainer]);

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
        <RouteObserverStage
          vertexToString={graph.vertexToString}
          currentStage={currentStage}
        />
      )}

      <GraphBuilder graphBuilder={graphBuilder} />
    </div>
  );
};

export default GraphRouting;
