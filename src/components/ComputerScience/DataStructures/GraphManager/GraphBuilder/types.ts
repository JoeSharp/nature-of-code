import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { BaseDataItem } from "src/components/p5/Boid/types";
import { PositionByVertex } from "../types";

export interface GraphSketchConfig<DATA_ITEM extends BaseDataItem<any>> {
  graph: Graph<DATA_ITEM>;
  vertexPositions: PositionByVertex;
  physicsEnabled: boolean;
}
