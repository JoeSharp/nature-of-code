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
import {
  StringDataItem,
  createSimpleStringDataItem,
} from "src/components/p5/Boid/DataItemBoid";

const VERTEX_A = createSimpleStringDataItem("A");
const VERTEX_B = createSimpleStringDataItem("B");
const VERTEX_C = createSimpleStringDataItem("C");
const VERTEX_D = createSimpleStringDataItem("D");
const VERTEX_E = createSimpleStringDataItem("E");
const VERTEX_F = createSimpleStringDataItem("F");
const VERTEX_G = createSimpleStringDataItem("G");
const VERTEX_S = createSimpleStringDataItem("S");

const initialGraph = new Graph<StringDataItem>()
  .addBiDirectionalEdge(VERTEX_S, VERTEX_A)
  .addBiDirectionalEdge(VERTEX_S, VERTEX_B)
  .addBiDirectionalEdge(VERTEX_S, VERTEX_C)
  .addBiDirectionalEdge(VERTEX_A, VERTEX_D)
  .addBiDirectionalEdge(VERTEX_D, VERTEX_G)
  .addBiDirectionalEdge(VERTEX_B, VERTEX_E)
  .addBiDirectionalEdge(VERTEX_E, VERTEX_G)
  .addBiDirectionalEdge(VERTEX_C, VERTEX_F)
  .addBiDirectionalEdge(VERTEX_F, VERTEX_G);

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
