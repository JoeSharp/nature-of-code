import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

export interface GraphBuilder {
  pendingFrom: string | undefined;
  graph: Graph<string>;
}

export interface UseBuildGraph {
  version: number;
  graph: Graph<string>;
  pendingFrom: string | undefined;
  prepareEdge: (from: string) => void;
  cancelEdge: () => void;
  completeEdge: (to: string) => void;
  clearAll: () => void;
  tickVersion: () => void;
}
