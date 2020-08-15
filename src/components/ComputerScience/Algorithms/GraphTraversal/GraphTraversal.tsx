import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";
import GraphTraversalAlgorithmPicker, {
  usePicker,
} from "./GraphTraversalAlgorithmPicker";
import useGraphTraversal from "./useGraphTraversal";
import VertexPicker, {
  usePicker as useVertexPicker,
} from "../../GraphBuilder/VertexPicker";
import { largerStringGraph } from "../../DataStructures/GraphComponent/cannedGraphs";

const initialGraph = largerStringGraph();

const Traversal: React.FunctionComponent = () => {
  const { algorithmName, componentProps: algorithmPickerProps } = usePicker(
    "form-control"
  );

  const graphBuilder = useGraphBuilder(initialGraph);
  const { graph } = graphBuilder;
  const {
    vertex: startVertex,
    componentProps: vertexPickerProps,
  } = useVertexPicker(graph, "form-control");

  const { visitedItems } = useGraphTraversal({
    algorithmName,
    graph,
    startVertex,
  });

  return (
    <div>
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

      <h2>Item Visit Order: {visitedItems.map((v) => v.label).join(" -> ")}</h2>

      <GraphBuilder graphBuilder={graphBuilder} />
    </div>
  );
};

export default Traversal;
