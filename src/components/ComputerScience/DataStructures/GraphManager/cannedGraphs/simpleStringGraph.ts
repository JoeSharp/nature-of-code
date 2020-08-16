import { createSimpleStringDataItem } from "src/components/p5/Boid/DataItemBoid";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/types";
import { PositionByVertex } from "../types";

export default () => {
  const VERTEX_A = createSimpleStringDataItem("A");
  const VERTEX_B = createSimpleStringDataItem("B");
  const VERTEX_C = createSimpleStringDataItem("C");
  const VERTEX_D = createSimpleStringDataItem("D");

  return new Graph<StringDataItem>({
    vertexToString: (v) => v.key,
    equalityCheck: (a, b) => a.key === b.key,
  })
    .addUnidirectionalEdge(VERTEX_A, VERTEX_B)
    .addUnidirectionalEdge(VERTEX_B, VERTEX_A)
    .addUnidirectionalEdge(VERTEX_B, VERTEX_C)
    .addUnidirectionalEdge(VERTEX_B, VERTEX_D)
    .addUnidirectionalEdge(VERTEX_D, VERTEX_A);
};

export const vertexPositions: PositionByVertex = {
  "2ef44704-65e6-42a1-8401-8531ec1f7f70": {
    x: 300.7800352194255,
    y: 67.73499912843879,
  },
  "0bbee7ba-16a7-4a92-bc90-2412d2d9a398": {
    x: 217.69357315354137,
    y: 159.88164957939472,
  },
  "3fc60e73-1c4a-4c3e-9baa-516eba2c5087": {
    x: 100.15181038150843,
    y: 71.79284092644922,
  },
  "4460f4d9-66b7-46f2-9cf7-a66cc606ee8c": {
    x: 369.52546798419223,
    y: 174.49176203467212,
  },
};
