import {
  createSimpleStringDataItem,
  StringDataItem,
} from "src/components/p5/Boid/DataItemBoid";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

const VERTEX_A = createSimpleStringDataItem("A");
const VERTEX_B = createSimpleStringDataItem("B");
const VERTEX_C = createSimpleStringDataItem("C");
const VERTEX_D = createSimpleStringDataItem("D");
const VERTEX_E = createSimpleStringDataItem("E");
const VERTEX_F = createSimpleStringDataItem("F");
const VERTEX_G = createSimpleStringDataItem("G");
const VERTEX_S = createSimpleStringDataItem("S");

export default () =>
  new Graph<StringDataItem>({
    vertexToString: (v) => v.key,
    equalityCheck: (a, b) => a.key === b.key,
  })
    .addBiDirectionalEdge(VERTEX_S, VERTEX_A)
    .addBiDirectionalEdge(VERTEX_S, VERTEX_B)
    .addBiDirectionalEdge(VERTEX_S, VERTEX_C)
    .addBiDirectionalEdge(VERTEX_A, VERTEX_D)
    .addBiDirectionalEdge(VERTEX_D, VERTEX_G)
    .addBiDirectionalEdge(VERTEX_B, VERTEX_E)
    .addBiDirectionalEdge(VERTEX_E, VERTEX_G)
    .addBiDirectionalEdge(VERTEX_C, VERTEX_F)
    .addBiDirectionalEdge(VERTEX_F, VERTEX_G);
