import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { UseDrawDetails } from "src/components/p5/Boid/types";

export interface UseBuildGraph<T> {
  version: number;
  graph: Graph<T>;
  drawDetails: UseDrawDetails;
  pendingFrom: T | undefined;
  newEdgeWeight: number;
  setNewEdgeWeight: (e: number) => void;
  prepareEdge: (from: T) => void;
  cancelEdge: () => void;
  completeEdge: (to: T, weight: number) => void;
  clearAll: () => void;
  tickVersion: () => void;
}
