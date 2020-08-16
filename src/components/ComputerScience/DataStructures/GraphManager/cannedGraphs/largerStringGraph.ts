import { createSimpleStringDataItem } from "src/components/p5/Boid/DataItemBoid";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/types";
import { PositionByVertex } from "../types";

export default () => {
  const VERTEX_A = createSimpleStringDataItem("A");
  const VERTEX_B = createSimpleStringDataItem("B");
  const VERTEX_C = createSimpleStringDataItem("C");
  const VERTEX_D = createSimpleStringDataItem("D");
  const VERTEX_E = createSimpleStringDataItem("E");
  const VERTEX_F = createSimpleStringDataItem("F");
  const VERTEX_G = createSimpleStringDataItem("G");
  const VERTEX_S = createSimpleStringDataItem("S");

  return new Graph<StringDataItem>({
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
};

export const vertexPositions: PositionByVertex = {
  "eede7d26-bc7a-4eec-9f84-66a5c527d254": {
    x: 316.0670544716842,
    y: 314.2996873345812,
  },
  "a583c3f0-ad98-4ca7-9554-25c80cadd95c": {
    x: 206.72180092832664,
    y: 150.07109157527478,
  },
  "f95148fa-6880-4bd9-bd8f-1bda8458f8fa": { x: 323, y: 169 },
  "5591e83a-a73a-433a-86bf-c8481e0a5816": {
    x: 447.435337393964,
    y: 340.9299741504452,
  },
  "96b42380-ea79-4bb5-b55e-71ae6fec6bd7": {
    x: 301.2351479592719,
    y: 67.0220181160127,
  },
  "4d3eeafc-c3d4-464d-9b68-4b518ed7621c": {
    x: 501.20039233878566,
    y: 111.87766645510727,
  },
  "fda56d7c-e254-4eb8-879c-954af3e4911f": { x: 440, y: 205 },
  "4998aa72-ee09-45ea-870a-541170cf9675": {
    x: 566.1502210028658,
    y: 221.27819153808466,
  },
};
