import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import GraphSketch from "./GraphSketch";
import { UseSketch } from "src/components/p5/useSketch";

export interface HeuristicCostById {
  [id: string]: number;
}

export interface GraphSketchConfig<T> {
  graph: Graph<T>;
  physicsEnabled: boolean;
  getKey: (item: T) => string;
}

export interface UseGraphBuilder<T> {
  version: number;
  graph: Graph<T>;
  pendingFrom: T | undefined;
  newEdgeWeight: number;
  setNewEdgeWeight: (e: number) => void;
  prepareEdge: (from: T) => void;
  cancelEdge: () => void;
  completeEdge: (to: T, weight: number) => void;
  clearAll: () => void;
  tickVersion: () => void;
  sketchUse: UseSketch<GraphSketchConfig<T>, GraphSketch<T>>;
}
