import React from "react";
import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";
import { UseBuildGraph } from "./types";
import useDrawDetails from "../../p5/Boid/useDrawDetails";

const versionReducer = (state: number): number => state + 1;

const defaultInitialGraph: Graph<string> = new Graph<string>()
  .addUnidirectionalEdge("a", "b")
  .addUnidirectionalEdge("b", "a")
  .addUnidirectionalEdge("b", "c")
  .addUnidirectionalEdge("b", "d")
  .addUnidirectionalEdge("d", "a");

const useGraphBuilder = (initialGraph = defaultInitialGraph): UseBuildGraph => {
  const [version, tickVersion] = React.useReducer(versionReducer, 0);

  const graph = React.useRef<Graph<string>>(initialGraph);
  const [pendingFrom, prepareEdge] = React.useState<string | undefined>(
    undefined
  );

  const completeEdge = React.useCallback(
    (to: string) => {
      if (pendingFrom !== undefined) {
        graph.current.addUnidirectionalEdge(pendingFrom, to);
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
    graph: graph.current,
    pendingFrom,
    prepareEdge,
    cancelEdge,
    completeEdge,
    clearAll,
  };
};

export default useGraphBuilder;
