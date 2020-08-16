import React from "react";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { UseGraphBuilder, GraphSketchConfig } from "./types";
import useSketch from "src/components/p5/useSketch";
import GraphSketch from "./GraphSketch";
import { BaseDataItem } from "src/components/p5/Boid/types";

const useGraphBuilder = <DATA_ITEM extends BaseDataItem<any>>(
  initialGraph: Graph<DATA_ITEM>
): UseGraphBuilder<DATA_ITEM> => {
  const [version, tickVersion] = React.useReducer((s) => s + 1, 0);

  const graph = React.useRef<Graph<DATA_ITEM>>(initialGraph);
  const [pendingFrom, prepareEdge] = React.useState<DATA_ITEM | undefined>(
    undefined
  );

  const [newEdgeWeight, setNewEdgeWeight] = React.useState<number>(1);

  const changeGraph = React.useCallback(
    (newGraph: Graph<DATA_ITEM>) => {
      graph.current = newGraph;
      tickVersion();
    },
    [graph, tickVersion]
  );

  const completeEdge = React.useCallback(
    (to: DATA_ITEM, weight: number) => {
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

  const sketchUse = useSketch<
    GraphSketchConfig<DATA_ITEM>,
    GraphSketch<DATA_ITEM>
  >(GraphSketch);

  return {
    version,
    tickVersion,
    newEdgeWeight,
    setNewEdgeWeight,
    changeGraph,
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
