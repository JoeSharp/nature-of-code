import {
  createSimpleStringDataItem,
  StringDataItem,
} from "src/components/p5/Boid/DataItemBoid";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

const VERTEX_A = createSimpleStringDataItem("A");
const VERTEX_B = createSimpleStringDataItem("B");
const VERTEX_C = createSimpleStringDataItem("C");
const VERTEX_D = createSimpleStringDataItem("D");

export default () =>
  new Graph<StringDataItem>({
    vertexToString: (v) => v.key,
    equalityCheck: (a, b) => a.key === b.key,
  })
    .addUnidirectionalEdge(VERTEX_A, VERTEX_B)
    .addUnidirectionalEdge(VERTEX_B, VERTEX_A)
    .addUnidirectionalEdge(VERTEX_B, VERTEX_C)
    .addUnidirectionalEdge(VERTEX_B, VERTEX_D)
    .addUnidirectionalEdge(VERTEX_D, VERTEX_A);
