import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";
import { UseDrawDetails } from "src/components/p5/Boid/types";

export interface UseBuildGraph {
  version: number;
  graph: Graph<string>;
  drawDetails: UseDrawDetails;
  pendingFrom: string | undefined;
  newEdgeWeight: number;
  setNewEdgeWeight: (e: number) => void;
  prepareEdge: (from: string) => void;
  cancelEdge: () => void;
  completeEdge: (to: string, weight: number) => void;
  clearAll: () => void;
  tickVersion: () => void;
}
