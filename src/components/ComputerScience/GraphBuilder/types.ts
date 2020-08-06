import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";
import { UseDrawDetails } from "src/components/p5/Boid/types";

export interface UseBuildGraph {
  version: number;
  graph: Graph<string>;
  drawDetails: UseDrawDetails;
  pendingFrom: string | undefined;
  prepareEdge: (from: string) => void;
  cancelEdge: () => void;
  completeEdge: (to: string) => void;
  clearAll: () => void;
  tickVersion: () => void;
}
