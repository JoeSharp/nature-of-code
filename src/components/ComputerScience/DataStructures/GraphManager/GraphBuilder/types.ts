import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { BaseDataItem } from "src/components/p5/Boid/types";
import { PositionByVertex } from "../types";

export interface GraphSketchConfig<DATA_ITEM extends BaseDataItem<any>> {
  graph: Graph<DATA_ITEM>;
  vertexPositions: PositionByVertex;
  physicsEnabled: boolean;
}

export interface UseGraphBuilder<DATA_ITEM extends BaseDataItem<any>> {
  version: number;
  graph: Graph<DATA_ITEM>;
  pendingFrom: DATA_ITEM | undefined;
  newEdgeWeight: number;
  changeGraph: (graph: Graph<DATA_ITEM>) => void;
  setNewEdgeWeight: (e: number) => void;
  prepareEdge: (from: DATA_ITEM) => void;
  cancelEdge: () => void;
  completeEdge: (to: DATA_ITEM, weight: number) => void;
  clearAll: () => void;
  tickVersion: () => void;
}
