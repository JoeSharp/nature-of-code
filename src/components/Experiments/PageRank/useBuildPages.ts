import React from "react";

import { PageGraphBuilder, UseBuildPages } from "./types";

const EMPTY_PAGE_GRAPH: PageGraphBuilder = {
  pendingFrom: undefined,
  graph: {
    pages: [],
    links: []
  }
};

const DEFAULT_PAGE_GRAPH: PageGraphBuilder = {
  pendingFrom: undefined,
  graph: {
    pages: ["a", "b", "c", "d"],
    links: [
      { from: "a", to: "b" },
      { from: "b", to: "a" },
      { from: "b", to: "c" },
      { from: "b", to: "d" },
      { from: "d", to: "a" }
    ]
  }
};

interface ClearAll {
  type: "clearAll";
}

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
  | ClearAll
  | AddPage
  | RemovePage
  | PrepareLink
  | CancelLink
  | CompleteLink
  | RemoveLink;

const pageReducer = (state: PageGraphBuilder, action: PageReducerAction) => {
  switch (action.type) {
    case "clearAll":
      return EMPTY_PAGE_GRAPH;
    case "addPage":
      return {
        ...state,
        graph: { ...state.graph, pages: [...state.graph.pages, action.page] }
      };
    case "removePage":
      return {
        ...state,
        graph: {
          ...state.graph,
          pages: state.graph.pages.filter(p => p !== action.page),
          links: state.graph.links.filter(
            ({ from, to }) => !(from === action.page || to === action.page)
          )
        }
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
            graph: {
              ...state.graph,
              links: [
                ...state.graph.links.filter(
                  l => !(l.from === state.pendingFrom && l.to === action.to)
                ),
                { from: state.pendingFrom, to: action.to }
              ]
            }
          }
        : state;
    case "removeLink":
      return {
        ...state,
        graph: {
          ...state.graph,

          links: state.graph.links.filter(
            l => !(l.from === action.from && l.to === action.to)
          )
        }
      };
  }

  return state;
};

const useBuildPages = (): UseBuildPages => {
  const [pageGraphBuilder, dispatch] = React.useReducer(
    pageReducer,
    DEFAULT_PAGE_GRAPH
  );

  const clearAll = React.useCallback(() => dispatch({ type: "clearAll" }), []);
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
    pageGraphBuilder,
    clearAll,
    addPage,
    removePage,
    prepareLink,
    cancelLink,
    completeLink,
    removeLink
  };
};

export default useBuildPages;
