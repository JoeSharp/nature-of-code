export interface Link {
  from: string;
  to: string;
}

export interface PageGraph {
  pendingFrom: string | undefined;
  pages: string[];
  links: Link[];
}

export interface UseBuildPages {
  pageGraph: PageGraph;
  addPage: (page: string) => void;
  removePage: (page: string) => void;
  prepareLink: (from: string) => void;
  cancelLink: () => void;
  completeLink: (to: string) => void;
  removeLink: (from: string, to: string) => void;
}
