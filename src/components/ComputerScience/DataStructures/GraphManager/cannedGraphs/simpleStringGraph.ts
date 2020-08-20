import { createSimpleStringDataItem } from "src/components/p5/Boid/DataItemBoid";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/types";
import { PositionByVertex } from "../types";

const createDataItem = (content: string) =>
  createSimpleStringDataItem("sg-1", content);

const VERTEX_A = createDataItem("A");
const VERTEX_B = createDataItem("B");
const VERTEX_C = createDataItem("C");
const VERTEX_D = createDataItem("D");

export default () => {
  return new Graph<StringDataItem>({
    getVertexKey: (v) => v.key,
    areVerticesEqual: (a, b) => a.key === b.key,
  })
    .addUnidirectionalEdge(VERTEX_A, VERTEX_B)
    .addUnidirectionalEdge(VERTEX_B, VERTEX_A)
    .addUnidirectionalEdge(VERTEX_B, VERTEX_C)
    .addUnidirectionalEdge(VERTEX_B, VERTEX_D)
    .addUnidirectionalEdge(VERTEX_D, VERTEX_A);
};

export const vertexPositions: PositionByVertex = {
  "sg-1-A": { x: 60, y: 52 },
  "sg-1-B": { x: 177, y: 48 },
  "sg-1-C": { x: 266, y: 94 },
  "sg-1-D": { x: 127, y: 122 },
};
