import React from "react";

import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

import GraphBuilder, { useGraphBuilder } from "../../../GraphBuilder";
import useRoutingAlgorithm from "../useRoutingAlgorithm";
import VertexPicker, { usePicker } from "../../../GraphBuilder/VertexPicker";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";
import RouteObserverStage from "../RouteObserverStage";

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

  const { path, stages } = useRoutingAlgorithm({
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
