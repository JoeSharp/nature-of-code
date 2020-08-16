import React from "react";
import useLocalStorage, {
  useStoreObjectFactory,
} from "src/components/lib/useLocalStorage";

import cannedGraphs from "./cannedGraphs";
import Graph, {
  Edge,
} from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem, Point } from "src/components/p5/Boid/types";

interface SavedGraphState {
  [name: string]: {
    vertices: StringDataItem[];
    edges: Edge<StringDataItem>[];
  };
}

interface GraphsById {
  [name: string]: Graph<StringDataItem>;
}

interface PositionByVertex {
  [key: string]: Point;
}

interface PositionsForGraphName {
  [name: string]: PositionByVertex;
}

interface UseSavedGraph {
  names: string[];
  graphs: GraphsById;
  vertexPositions: PositionsForGraphName;
  addOrUpdate(
    name: string,
    graph: Graph<any>,
    positions: PositionByVertex
  ): void;
  reset: () => void;
}

const defaultSavedGraphState: SavedGraphState = Object.entries(cannedGraphs)
  .map(([name, generator]) => ({ name, graph: generator() }))
  .reduce((acc, { name, graph }) => ({ ...acc, [name]: graph }), {});

const defaultSavedVertexState: PositionsForGraphName = {};

export default (): UseSavedGraph => {
  const {
    value: graphsData,
    reduceValue: reduceGraphs,
    setValue: setGraphs,
  } = useLocalStorage<SavedGraphState>(
    "saved-graphs",
    defaultSavedGraphState,
    useStoreObjectFactory()
  );

  const {
    value: vertexPositions,
    reduceValue: reduceVertexPositions,
    setValue: setVertexPositions,
  } = useLocalStorage<PositionsForGraphName>(
    "saved-graph-positions",
    defaultSavedVertexState,
    useStoreObjectFactory()
  );

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
    (name: string, graph: Graph<any>, positions: PositionByVertex) => {
      reduceGraphs((existing: SavedGraphState) => ({
        ...existing,
        [name]: graph,
      }));
      reduceVertexPositions((existing: PositionsForGraphName) => ({
        ...existing,
        [name]: positions,
      }));
    },
    [reduceGraphs, reduceVertexPositions]
  );

  const reset = React.useCallback(() => {
    setGraphs(defaultSavedGraphState);
    setVertexPositions({});
  }, [setGraphs, setVertexPositions]);

  return {
    names,
    graphs,
    vertexPositions,
    addOrUpdate,
    reset,
  };
};
