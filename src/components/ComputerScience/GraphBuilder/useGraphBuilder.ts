import React from "react";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { UseGraphBuilder, GraphSketchConfig } from "./types";
import useSketch from "src/components/p5/useSketch";
import GraphSketch from "./GraphSketch";

export const defaultStringGraph: Graph<string> = new Graph<string>()
  .addUnidirectionalEdge("a", "b")
  .addUnidirectionalEdge("b", "a")
  .addUnidirectionalEdge("b", "c")
  .addUnidirectionalEdge("b", "d")
  .addUnidirectionalEdge("d", "a");

const useGraphBuilder = <T>(initialGraph: Graph<T>): UseGraphBuilder<T> => {
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

  const sketchUse = useSketch<GraphSketchConfig<T>, GraphSketch<T>>(
    GraphSketch
  );

  return {
    version,
    tickVersion,
    newEdgeWeight,
    setNewEdgeWeight,
    graph: graph.current,
    pendingFrom,
    prepareEdge,
    cancelEdge,
    completeEdge,
    clearAll,
    sketchUse,
  };
};

export default useGraphBuilder;
