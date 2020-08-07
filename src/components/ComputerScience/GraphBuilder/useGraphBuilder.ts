import React from "react";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { UseBuildGraph } from "./types";
import useDrawDetails from "../../p5/Boid/useDrawDetails";

export const defaultStringGraph: Graph<string> = new Graph<string>()
  .addUnidirectionalEdge("a", "b")
  .addUnidirectionalEdge("b", "a")
  .addUnidirectionalEdge("b", "c")
  .addUnidirectionalEdge("b", "d")
  .addUnidirectionalEdge("d", "a");

const useGraphBuilder = <T>(initialGraph: Graph<T>): UseBuildGraph<T> => {
  const [version, tickVersion] = React.useReducer((s) => s + 1, 0);

  const graph = React.useRef<Graph<T>>(initialGraph);
  const [pendingFrom, prepareEdge] = React.useState<T | undefined>(undefined);

  const [newEdgeWeight, setNewEdgeWeight] = React.useState<number>(1);

  const completeEdge = React.useCallback(
    (to: T, weight: number) => {
      if (pendingFrom !== undefined) {
        graph.current.addUnidirectionalEdge(pendingFrom, to, weight);
      }
      prepareEdge(undefined);
      tickVersion();
    },
    [pendingFrom]
  );
  const cancelEdge = React.useCallback(() => prepareEdge(undefined), [
    prepareEdge,
  ]);

  const clearAll = React.useCallback(() => {
    graph.current.vertices.forEach((v) => graph.current.removeVertex(v));
    tickVersion();
  }, [tickVersion]);

  const drawDetails = useDrawDetails();

  return {
    version,
    drawDetails,
    tickVersion,
    newEdgeWeight,
    setNewEdgeWeight,
    graph: graph.current,
    pendingFrom,
    prepareEdge,
    cancelEdge,
    completeEdge,
    clearAll,
  };
};

export default useGraphBuilder;
