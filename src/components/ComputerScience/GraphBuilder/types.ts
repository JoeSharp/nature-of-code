import { GraphData } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

export interface GraphBuilder {
  pendingFrom: string | undefined;
  graphData: GraphData<string>;
}

export interface UseBuildGraph {
  graphBuilder: GraphBuilder;
  clearAll: () => void;
  addVertex: (page: string) => void;
  removeVertex: (page: string) => void;
  prepareEdge: (from: string) => void;
  cancelEdge: () => void;
  completeEdge: (to: string) => void;
  removeEdge: (from: string, to: string) => void;
}
