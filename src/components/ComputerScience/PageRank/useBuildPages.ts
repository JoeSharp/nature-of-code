import React from "react";
import Graph, {
  EMPTY_GRAPH_DATA,
} from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

import { PageGraphBuilder, UseBuildPages } from "./types";

const EMPTY_PAGE_GRAPH: PageGraphBuilder = {
  pendingFrom: undefined,
  graph: EMPTY_GRAPH_DATA,
};

const DEFAULT_PAGE_GRAPH: PageGraphBuilder = {
  pendingFrom: undefined,
  graph: new Graph<string>()
    .addUnidirectionalEdge("a", "b")
    .addUnidirectionalEdge("b", "a")
    .addUnidirectionalEdge("b", "c")
    .addUnidirectionalEdge("b", "d")
    .addUnidirectionalEdge("d", "a"),
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

interface PrepareEdge {
  type: "prepareEdge";
  from: string;
}

interface CancelEdge {
  type: "cancelEdge";
}

interface CompleteEdge {
  type: "completeEdge";
  to: string;
}

interface RemoveEdge {
  type: "removeEdge";
  from: string;
  to: string;
}

type PageReducerAction =
  | ClearAll
  | AddPage
  | RemovePage
  | PrepareEdge
  | CancelEdge
  | CompleteEdge
  | RemoveEdge;

const pageReducer = (
  state: PageGraphBuilder,
  action: PageReducerAction
): PageGraphBuilder => {
  switch (action.type) {
    case "clearAll":
      return EMPTY_PAGE_GRAPH;
    case "addPage":
      return {
        ...state,
        graph: {
          ...state.graph,
          vertices: [...state.graph.vertices, action.page],
        },
      };
    case "removePage":
      return {
        ...state,
        graph: {
          ...state.graph,
          vertices: [...state.graph.vertices].filter((p) => p !== action.page),
          edges: state.graph.edges.filter(
            ({ from, to }) => !(from === action.page || to === action.page)
          ),
        },
      };
    case "prepareEdge":
      return {
        ...state,
        pendingFrom: action.from,
      };
    case "cancelEdge":
      return { ...state, pendingFrom: undefined };
    case "completeEdge":
      return state.pendingFrom !== undefined
        ? {
            ...state,
            pendingFrom: undefined,
            graph: {
              ...state.graph,
              edges: [
                ...state.graph.edges.filter(
                  (l) => !(l.from === state.pendingFrom && l.to === action.to)
                ),
                { from: state.pendingFrom, to: action.to, weight: 1.0 },
              ],
            },
          }
        : state;
    case "removeEdge":
      return {
        ...state,
        graph: {
          ...state.graph,

          edges: state.graph.edges.filter(
            (l) => !(l.from === action.from && l.to === action.to)
          ),
        },
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
  const prepareEdge = React.useCallback(
    (from: string) => dispatch({ type: "prepareEdge", from }),
    []
  );
  const cancelEdge = React.useCallback(
    () => dispatch({ type: "cancelEdge" }),
    []
  );
  const completeEdge = React.useCallback(
    (to: string) => dispatch({ type: "completeEdge", to }),
    []
  );
  const removeEdge = React.useCallback(
    (from: string, to: string) => dispatch({ type: "removeEdge", from, to }),
    []
  );

  return {
    pageGraphBuilder,
    clearAll,
    addPage,
    removePage,
    prepareEdge,
    cancelEdge,
    completeEdge,
    removeEdge,
  };
};

export default useBuildPages;
