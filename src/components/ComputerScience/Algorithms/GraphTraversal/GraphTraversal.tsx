import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import GraphTraversalAlgorithmPicker, {
  usePicker,
} from "./GraphTraversalAlgorithmPicker";
import useGraphTraversal from "./useGraphTraversal";
import VertexPicker, {
  usePicker as useVertexPicker,
} from "../../GraphBuilder/VertexPicker";

const initialGraph = new Graph<string>()
  .addBiDirectionalEdge("S", "A")
  .addBiDirectionalEdge("S", "B")
  .addBiDirectionalEdge("S", "C")
  .addBiDirectionalEdge("A", "D")
  .addBiDirectionalEdge("D", "G")
  .addBiDirectionalEdge("B", "E")
  .addBiDirectionalEdge("E", "G")
  .addBiDirectionalEdge("C", "F")
  .addBiDirectionalEdge("F", "G");

const Traversal: React.FunctionComponent = () => {
  const { algorithmName, componentProps: algorithmPickerProps } = usePicker(
    "form-control"
  );

  const graphBuilder = useGraphBuilder(initialGraph);
  const { version, graph } = graphBuilder;
  const {
    vertex: startVertex,
    componentProps: vertexPickerProps,
  } = useVertexPicker(version, graph, "form-control");

  const { visitedItems } = useGraphTraversal({
    algorithmName,
    graph,
    startVertex,
  });

  return (
    <div>
      <h1>Graph Traversal</h1>

      <form>
        <div className="form-group">
          <label>Algorithm</label>
          <GraphTraversalAlgorithmPicker {...algorithmPickerProps} />
        </div>
        <div className="form-group">
          <label>Start Vertex</label>
          <VertexPicker {...vertexPickerProps} />
        </div>
      </form>

      <h2>Visited Items</h2>
      <ol>
        {visitedItems.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ol>

      <GraphBuilder graphBuilder={graphBuilder} />
    </div>
  );
};

export default Traversal;
