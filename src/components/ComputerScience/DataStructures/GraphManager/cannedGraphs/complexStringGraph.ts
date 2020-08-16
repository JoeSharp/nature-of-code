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
  const VERTEX_H = createSimpleStringDataItem("H");
  const VERTEX_I = createSimpleStringDataItem("I");
  const VERTEX_J = createSimpleStringDataItem("J");
  const VERTEX_K = createSimpleStringDataItem("K");
  const VERTEX_L = createSimpleStringDataItem("L");
  const VERTEX_S = createSimpleStringDataItem("S");

  return new Graph<StringDataItem>({
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
};

export const vertexPositions: PositionByVertex = {
  "4dc8dcd1-be7e-4e10-ba25-92cf57880ecc": { x: 164, y: 85 },
  "de39b8c4-af3a-4f11-b207-ea83156b3cf8": { x: 79, y: 171 },
  "0b0961d7-d216-4020-92cb-9ab5c9b57e0c": { x: 240, y: 224 },
  "ccee043b-2c6d-4836-aa95-ae3c00071873": {
    x: 326.9107670043836,
    y: 104.10585155935931,
  },
  "ace41119-be63-4421-8e1c-fb2ba1543283": { x: 134, y: 320 },
  "00023752-f5e9-4759-bb74-7ecb48bfc332": { x: 356, y: 317 },
  "93fe22fc-f0ad-4ff2-b2dc-8dc59749c075": {
    x: 452.1040248140914,
    y: 105.25050305972603,
  },
  "b95ac1bb-ada9-444d-b989-b18c05684237": { x: 250, y: 399 },
  "f85a1da2-433c-4760-952f-456f9347fbf6": {
    x: 597.1354410830785,
    y: 391.2386459898663,
  },
  "faad7bef-0d91-4aaa-b5fe-112c1350c4e8": {
    x: 603.3449870314157,
    y: 264.7125926477965,
  },
  "a983fbb8-ab41-4017-8cd2-fd4ab7b36cf4": { x: 431, y: 440 },
  "f59c1037-0324-4b53-9def-20e9ab3a94fa": {
    x: 582.9411203062774,
    y: 140.13634867597978,
  },
  "7354b9f2-d8b6-4c39-888b-0a9e4b083369": {
    x: 484.71071673107286,
    y: 226.36371671260412,
  },
};
