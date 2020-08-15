import React from "react";
import useLocalStorage, {
  useStoreObjectFactory,
} from "src/components/lib/useLocalStorage";

import cannedGraphs from "./cannedGraphs";
import Graph, {
  Edge,
} from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/DataItemBoid";

interface SavedGraphState {
  [name: string]: {
    vertices: StringDataItem[];
    edges: Edge<StringDataItem>[];
  };
}

interface GraphsById {
  [name: string]: Graph<StringDataItem>;
}

interface UseSavedGraph {
  names: string[];
  graphs: GraphsById;
  addOrUpdate(name: string, graph: Graph<any>): void;
  reset: () => void;
}

const defaultSavedGraphState: SavedGraphState = Object.entries(cannedGraphs)
  .map(([name, generator]) => ({ name, graph: generator() }))
  .reduce((acc, { name, graph }) => ({ ...acc, [name]: graph }), {});

export default (): UseSavedGraph => {
  const { value: graphsData, reduceValue, setValue } = useLocalStorage<
    SavedGraphState
  >("saved-graphs", defaultSavedGraphState, useStoreObjectFactory());

  const names: string[] = React.useMemo(() => Object.keys(graphsData), [
    graphsData,
  ]);
  const graphs: GraphsById = React.useMemo(
    () =>
      Object.entries(graphsData)
        .map(([name, graphData]) => {
          // Build full graphs from the base data
          const graph = new Graph<StringDataItem>({
            vertexToString: (d) => d.key,
            equalityCheck: (a, b) => a.key === b.key,
          });
          graph.vertices = graphData.vertices;
          graph.edges = graphData.edges;
          return { name, graph };
        })
        .reduce((acc, { name, graph }) => ({ ...acc, [name]: graph }), {}),
    [graphsData]
  );

  const addOrUpdate = React.useCallback(
    (name: string, graph: Graph<any>) => {
      reduceValue((existing: SavedGraphState) => ({
        ...existing,
        [name]: graph,
      }));
    },
    [reduceValue]
  );

  const reset = React.useCallback(() => setValue(defaultSavedGraphState), [
    setValue,
  ]);

  return {
    names,
    graphs,
    addOrUpdate,
    reset,
  };
};
