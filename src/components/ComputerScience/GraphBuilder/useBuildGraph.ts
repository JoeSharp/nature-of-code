import React from "react";
import Graph, {
  EMPTY_GRAPH_DATA,
} from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

import { GraphBuilder, UseBuildGraph } from "./types";

const EMPTY_GRAPH: GraphBuilder = {
  pendingFrom: undefined,
  graph: EMPTY_GRAPH_DATA,
};

const DEFAULT_GRAPH_GRAPH: GraphBuilder = {
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

interface AddGraph {
  type: "addVertex";
  graph: string;
}

interface RemoveGraph {
  type: "removeVertex";
  graph: string;
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

type GraphReducerAction =
  | ClearAll
  | AddGraph
  | RemoveGraph
  | PrepareEdge
  | CancelEdge
  | CompleteEdge
  | RemoveEdge;

const graphReducer = (
  state: GraphBuilder,
  action: GraphReducerAction
): GraphBuilder => {
  switch (action.type) {
    case "clearAll":
      return EMPTY_GRAPH;
    case "addVertex":
      return {
        ...state,
        graph: {
          ...state.graph,
          vertices: [...state.graph.vertices, action.graph],
        },
      };
    case "removeVertex":
      return {
        ...state,
        graph: {
          ...state.graph,
          vertices: [...state.graph.vertices].filter((p) => p !== action.graph),
          edges: state.graph.edges.filter(
            ({ from, to }) => !(from === action.graph || to === action.graph)
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
};

const useBuildGraph = (): UseBuildGraph => {
  const [graphBuilder, dispatch] = React.useReducer(
    graphReducer,
    DEFAULT_GRAPH_GRAPH
  );

  const clearAll = React.useCallback(() => dispatch({ type: "clearAll" }), []);
  const addVertex = React.useCallback(
    (graph: string) => dispatch({ type: "addVertex", graph }),
    []
  );
  const removeVertex = React.useCallback(
    (graph: string) => dispatch({ type: "removeVertex", graph }),
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
    graphBuilder,
    clearAll,
    addVertex,
    removeVertex,
    prepareEdge,
    cancelEdge,
    completeEdge,
    removeEdge,
  };
};

export default useBuildGraph;
