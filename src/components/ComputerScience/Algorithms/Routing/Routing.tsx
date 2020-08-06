import React from "react";

import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";
import useRoutingAlgorithm from "./useRoutingAlgorithm";
import VertexPicker, { usePicker } from "./VertexPicker";
import { BoidDrawDetails } from "src/components/p5/Boid/types";

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

const inPathDrawDetails: BoidDrawDetails = {
  borderWeight: 3,
  colour: "red",
};
const notInPathDrawDetails: BoidDrawDetails = {
  borderWeight: 1,
  colour: "blue",
};

const Routing: React.FunctionComponent = () => {
  const buildGraph = useGraphBuilder(initialGraph);
  const {
    graph,
    drawDetails: { setDetails },
  } = buildGraph;

  const { vertex: sourceNode, componentProps: sourcePickerProps } = usePicker(
    graph,
    "form-control"
  );
  const {
    vertex: destinationNode,
    componentProps: destinationPickerProps,
  } = usePicker(graph, "form-control");

  const { path } = useRoutingAlgorithm({ graph, sourceNode, destinationNode });

  React.useEffect(() => {
    graph.vertices.forEach((v) =>
      setDetails(v, path.includes(v) ? inPathDrawDetails : notInPathDrawDetails)
    );
  }, [graph, path, setDetails]);

  return (
    <div>
      <h1>Routing Algorithms</h1>

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

      <h2>Shortest Path</h2>
      <ol>
        {path.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ol>

      <GraphBuilder buildGraph={buildGraph} />
    </div>
  );
};

export default Routing;
