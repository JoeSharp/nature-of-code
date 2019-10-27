import React from "react";

import { Link } from "./types";

interface PageGraph {
  pendingFrom: string | undefined;
  pages: string[];
  links: Link[];
}

const DEFAULT_PAGE_GRAPH: PageGraph = {
  pendingFrom: undefined,
  pages: ["a", "b", "c"],
  links: [{ from: "a", to: "b" }]
};

interface AddPage {
  type: "addPage";
  page: string;
}

interface RemovePage {
  type: "removePage";
  page: string;
}

interface PrepareLink {
  type: "prepareLink";
  from: string;
}

interface CancelLink {
  type: "cancelLink";
}

interface CompleteLink {
  type: "completeLink";
  to: string;
}

interface RemoveLink {
  type: "removeLink";
  from: string;
  to: string;
}

type PageReducerAction =
  | AddPage
  | RemovePage
  | PrepareLink
  | CancelLink
  | CompleteLink
  | RemoveLink;

const pageReducer = (state: PageGraph, action: PageReducerAction) => {
  switch (action.type) {
    case "addPage":
      return { ...state, pages: [...state.pages, action.page] };
    case "removePage":
      return {
        ...state,
        pages: state.pages.filter(p => p !== action.page)
      };
    case "prepareLink":
      return {
        ...state,
        pendingFrom: action.from
      };
    case "cancelLink":
      return { ...state, pendingFrom: undefined };
    case "completeLink":
      return state.pendingFrom !== undefined
        ? {
            ...state,
            pendingFrom: undefined,
            links: [
              ...state.links.filter(
                l => !(l.from === state.pendingFrom && l.to === action.to)
              ),
              { from: state.pendingFrom, to: action.to }
            ]
          }
        : state;
    case "removeLink":
      return {
        ...state,
        links: state.links.filter(
          l => !(l.from === action.from && l.to === action.to)
        )
      };
  }

  return state;
};

interface UsePageRank {
  pageGraph: PageGraph;
  addPage: (page: string) => void;
  removePage: (page: string) => void;
  prepareLink: (from: string) => void;
  cancelLink: () => void;
  completeLink: (to: string) => void;
  removeLink: (from: string, to: string) => void;
}

const usePageRank = (): UsePageRank => {
  const [pageGraph, dispatch] = React.useReducer(
    pageReducer,
    DEFAULT_PAGE_GRAPH
  );

  const addPage = React.useCallback(
    (page: string) => dispatch({ type: "addPage", page }),
    []
  );
  const removePage = React.useCallback(
    (page: string) => dispatch({ type: "removePage", page }),
    []
  );
  const prepareLink = React.useCallback(
    (from: string) => dispatch({ type: "prepareLink", from }),
    []
  );
  const cancelLink = React.useCallback(
    () => dispatch({ type: "cancelLink" }),
    []
  );
  const completeLink = React.useCallback(
    (to: string) => dispatch({ type: "completeLink", to }),
    []
  );
  const removeLink = React.useCallback(
    (from: string, to: string) => dispatch({ type: "removeLink", from, to }),
    []
  );

  return {
    pageGraph,
    addPage,
    removePage,
    prepareLink,
    cancelLink,
    completeLink,
    removeLink
  };
};

export default usePageRank;
