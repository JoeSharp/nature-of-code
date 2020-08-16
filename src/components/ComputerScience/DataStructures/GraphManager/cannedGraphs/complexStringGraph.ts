import { createSimpleStringDataItem } from "src/components/p5/Boid/DataItemBoid";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/types";

const VERTEX_A = createSimpleStringDataItem("A");
const VERTEX_B = createSimpleStringDataItem("B");
const VERTEX_C = createSimpleStringDataItem("C");
const VERTEX_D = createSimpleStringDataItem("D");
const VERTEX_E = createSimpleStringDataItem("E");
const VERTEX_F = createSimpleStringDataItem("F");
const VERTEX_G = createSimpleStringDataItem("G");
const VERTEX_H = createSimpleStringDataItem("H");
const VERTEX_I = createSimpleStringDataItem("I");
const VERTEX_J = createSimpleStringDataItem("J");
const VERTEX_K = createSimpleStringDataItem("K");
const VERTEX_L = createSimpleStringDataItem("L");
const VERTEX_S = createSimpleStringDataItem("S");

export default () =>
  new Graph<StringDataItem>({
    vertexToString: (v) => v.key,
    equalityCheck: (a, b) => a.key === b.key,
  })
    .addBiDirectionalEdge(VERTEX_S, VERTEX_A, 7)
    .addBiDirectionalEdge(VERTEX_S, VERTEX_B, 2)
    .addBiDirectionalEdge(VERTEX_S, VERTEX_C, 3)
    .addBiDirectionalEdge(VERTEX_A, VERTEX_D, 4)
    .addBiDirectionalEdge(VERTEX_A, VERTEX_B, 3)
    .addBiDirectionalEdge(VERTEX_B, VERTEX_D, 4)
    .addBiDirectionalEdge(VERTEX_B, VERTEX_H, 1)
    .addBiDirectionalEdge(VERTEX_C, VERTEX_L, 2)
    .addBiDirectionalEdge(VERTEX_D, VERTEX_F, 5)
    .addBiDirectionalEdge(VERTEX_E, VERTEX_K, 5)
    .addBiDirectionalEdge(VERTEX_E, VERTEX_G, 2)
    .addBiDirectionalEdge(VERTEX_F, VERTEX_H, 3)
    .addBiDirectionalEdge(VERTEX_G, VERTEX_H, 2)
    .addBiDirectionalEdge(VERTEX_I, VERTEX_L, 4)
    .addBiDirectionalEdge(VERTEX_I, VERTEX_K, 4)
    .addBiDirectionalEdge(VERTEX_J, VERTEX_L, 4)
    .addBiDirectionalEdge(VERTEX_J, VERTEX_K, 4);
