import React from "react";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { cloneDeep } from "lodash";

import {
  dijstraks,
  getPathTo,
} from "comp-sci-maths-lib/dist/algorithms/routing/dijkstras";
import {
  ShortestPathTree,
  ObserverArgsWithPathFrom,
} from "comp-sci-maths-lib/dist/algorithms/routing/types";

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
            observer: ({
              shortestPathTree,
              currentDistances,
              currentItem,
              outgoing,
            }) =>
              stages.push(
                cloneDeep({
                  currentItem,
                  currentDistances,
                  shortestPathTree,
                  outgoing,
                  pathFrom: [
                    ...getPathTo({
                      graph,
                      shortestPathTree,
                      node:
                        (currentItem !== undefined && currentItem.viaNode) ||
                        destinationNode ||
                        sourceNode,
                    }),
                    (currentItem !== undefined && currentItem.node) ||
                      destinationNode ||
                      sourceNode, // hmm not sure about needing this...
                  ],
                })
              ),
          })
        : {};
    const path =
      destinationNode !== undefined
        ? getPathTo({ graph, shortestPathTree, node: destinationNode })
        : [];

    return { version, shortestPathTree, path, stages };
  }, [sourceNode, destinationNode, graph, version]);
