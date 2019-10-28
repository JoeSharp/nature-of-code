export interface Link {
  from: string;
  to: string;
}

export interface PageGraph {
  pages: string[];
  links: Link[];
}

export interface PageGraphBuilder {
  pendingFrom: string | undefined;
  graph: PageGraph;
}

export interface PageRanks {
  [s: string]: number;
}

export interface UseBuildPages {
  pageGraphBuilder: PageGraphBuilder;
  clearAll: () => void;
  addPage: (page: string) => void;
  removePage: (page: string) => void;
  prepareLink: (from: string) => void;
  cancelLink: () => void;
  completeLink: (to: string) => void;
  removeLink: (from: string, to: string) => void;
}
