import React from "react";
import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

import {
  dijstraks,
  getPathTo,
} from "ocr-cs-alevel-ts/dist/algorithms/routing/dijkstras";
import {
  ShortestPathTree,
  ObserverArgsWithPathFrom,
} from "ocr-cs-alevel-ts/dist/algorithms/routing/types";

export interface Props<T> {
  version: number;
  sourceNode?: T;
  destinationNode?: T;
  graph: Graph<T>;
}

export interface UseRoutingAlgorithm<T> {
  shortestPathTree: ShortestPathTree<T>;
  path: T[];
  stages: ObserverArgsWithPathFrom<T>[];
}

export default <T>({
  version,
  sourceNode,
  destinationNode,
  graph,
}: Props<T>): UseRoutingAlgorithm<T> =>
  React.useMemo(() => {
    const stages: ObserverArgsWithPathFrom<T>[] = [];
    const shortestPathTree: ShortestPathTree<T> =
      sourceNode !== undefined
        ? dijstraks({
            graph,
            sourceNode,
            destinationNode,
            observer: ({ shortestPathTree, currentDistances, currentItem }) =>
              stages.push({
                currentItem,
                currentDistances,
                shortestPathTree,
                pathFrom: getPathTo({
                  graph,
                  shortestPathTree,
                  node: !!currentItem ? currentItem.node : sourceNode,
                }),
              }),
          })
        : {};
    const path =
      destinationNode !== undefined
        ? getPathTo({ graph, shortestPathTree, node: destinationNode })
        : [];

    return { version, shortestPathTree, path, stages };
  }, [sourceNode, destinationNode, graph, version]);
