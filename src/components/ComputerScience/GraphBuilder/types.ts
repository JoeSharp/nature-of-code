import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import GraphSketch from "./GraphSketch";
import { UseSketch } from "src/components/p5/useSketch";
import p5 from "p5";
import { BaseDataItem } from "src/components/p5/Boid/DataItemBoid";

export interface HeuristicCost {
  vertexLabel: string;
  position: p5.Vector;
  distance: number;
}

export interface HeuristicCostById {
  [id: string]: HeuristicCost;
}

export interface GraphSketchConfig<DATA_ITEM extends BaseDataItem<any>> {
  graph: Graph<DATA_ITEM>;
  physicsEnabled: boolean;
}

export interface UseGraphBuilder<DATA_ITEM extends BaseDataItem<any>> {
  version: number;
  graph: Graph<DATA_ITEM>;
  pendingFrom: DATA_ITEM | undefined;
  newEdgeWeight: number;
  setNewEdgeWeight: (e: number) => void;
  prepareEdge: (from: DATA_ITEM) => void;
  cancelEdge: () => void;
  completeEdge: (to: DATA_ITEM, weight: number) => void;
  clearAll: () => void;
  tickVersion: () => void;
  sketchUse: UseSketch<GraphSketchConfig<DATA_ITEM>, GraphSketch<DATA_ITEM>>;
}
