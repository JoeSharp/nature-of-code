import React from "react";
import GraphTraversalAlgorithmPicker, {
  usePicker,
} from "./GraphTraversalAlgorithmPicker";
import useGraphTraversal from "./useGraphTraversal";
import VertexPicker, {
  usePicker as useVertexPicker,
} from "../../GraphBuilder/VertexPicker";
import { largerStringGraph } from "../../DataStructures/GraphComponent/cannedGraphs";
import useGraphSketch from "../../GraphBuilder/useGraphSketch";

const Traversal: React.FunctionComponent = () => {
  const { algorithmName, componentProps: algorithmPickerProps } = usePicker(
    "form-control"
  );

  const graph = React.useMemo(() => largerStringGraph(), []);

  const { refContainer } = useGraphSketch(graph);

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

      <div ref={refContainer} />
    </div>
  );
};

export default Traversal;
