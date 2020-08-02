import { GraphData } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

export interface PageGraphBuilder {
  pendingFrom: string | undefined;
  graph: GraphData<string>;
}

export interface PageRanks {
  [s: string]: number;
}

export interface UseBuildPages {
  pageGraphBuilder: PageGraphBuilder;
  clearAll: () => void;
  addPage: (page: string) => void;
  removePage: (page: string) => void;
  prepareEdge: (from: string) => void;
  cancelEdge: () => void;
  completeEdge: (to: string) => void;
  removeEdge: (from: string, to: string) => void;
}
