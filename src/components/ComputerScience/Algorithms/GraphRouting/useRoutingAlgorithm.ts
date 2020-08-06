import React from "react";
import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

import {
  dijstraks,
  getPath,
} from "ocr-cs-alevel-ts/dist/algorithms/routing/dijkstras";
import { ShortestPathTree } from "ocr-cs-alevel-ts/dist/algorithms/routing/types";

export interface Props<T> {
  version: number;
  sourceNode?: T;
  destinationNode?: T;
  graph: Graph<T>;
}

export interface UseRoutingAlgorithm<T> {
  shortestPathTree: ShortestPathTree<T>;
  path: T[];
}

export default <T>({
  version,
  sourceNode,
  destinationNode,
  graph,
}: Props<T>): UseRoutingAlgorithm<T> =>
  React.useMemo(() => {
    const shortestPathTree: ShortestPathTree<T> =
      sourceNode !== undefined
        ? dijstraks({
            graph,
            sourceNode,
            destinationNode,
          })
        : {};
    const path =
      destinationNode !== undefined
        ? getPath(graph, shortestPathTree, destinationNode)
        : [];
    path.reverse();

    return { version, shortestPathTree, path };
  }, [sourceNode, destinationNode, graph, version]);
