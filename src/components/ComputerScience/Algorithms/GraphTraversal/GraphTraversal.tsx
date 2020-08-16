import React from "react";
import GraphTraversalAlgorithmPicker, {
  usePicker as useAlgorithmPicker,
} from "./GraphTraversalAlgorithmPicker";
import useGraphTraversal from "./useGraphTraversal";
import VertexPicker, {
  usePicker as useVertexPicker,
} from "src/components/ComputerScience/DataStructures/GraphComponent/GraphBuilder/VertexPicker";
import { largerStringGraph } from "../../DataStructures/GraphComponent/cannedGraphs";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/types";
import GraphPicker, {
  usePicker as useGraphPicker,
} from "../../DataStructures/GraphComponent/GraphPicker";

const initialGraph: Graph<StringDataItem> = largerStringGraph();

const Traversal: React.FunctionComponent = () => {
  const {
    algorithmName,
    componentProps: algorithmPickerProps,
  } = useAlgorithmPicker("form-control");

  const {
    graph,
    componentProps: graphPickerProps,
    sketchUse: { refContainer },
  } = useGraphPicker({ initialGraph, className: "form-control" });

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
          <label>Graph</label>
          <GraphPicker {...graphPickerProps} />
        </div>
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
