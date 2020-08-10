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
  HeuristicCostFunction,
} from "comp-sci-maths-lib/dist/algorithms/routing/types";
import { HeuristicCostById } from "../../GraphBuilder/types";
import p5 from "p5";
import { Optional } from "comp-sci-maths-lib/dist/types";

export interface Props<T> {
  version: number;
  sourceNode?: T;
  destinationNode?: T;
  getPositionOfNode: (vertex: T) => Optional<p5.Vector>;
  graph: Graph<T>;
  getKey: (vertex: T) => string;
}

export interface UseRoutingAlgorithm<T> {
  shortestPathTree: ShortestPathTree<T>;
  path: T[];
  heuristicCosts: HeuristicCostById;
  stages: ObserverArgsWithPathFrom<T>[];
  onHarvestDistances: () => void;
}

export default <T>({
  version,
  sourceNode,
  destinationNode,
  graph,
  getKey,
  getPositionOfNode,
}: Props<T>): UseRoutingAlgorithm<T> => {
  const [heuristicCosts, setHeuristicsCosts] = React.useState<
    HeuristicCostById
  >({});
  return React.useMemo(() => {
    const getHeuristicCost: HeuristicCostFunction<T> = (vertex: T) =>
      heuristicCosts[getKey(vertex)] || 0;

    const onHarvestDistances = () => {
      if (destinationNode !== undefined) {
        const destinationPosition = getPositionOfNode(destinationNode);

        if (!!destinationPosition) {
          const costs: HeuristicCostById = graph.vertices
            .map((vertex) => ({
              vertex,
              position: getPositionOfNode(vertex) || destinationPosition,
            }))
            .map(({ vertex, position }) => ({
              vertex,
              distance: p5.Vector.sub(position, destinationPosition).mag(),
            }))
            .reduce(
              (acc, curr) => ({ ...acc, [getKey(curr.vertex)]: curr.distance }),
              {}
            );

          setHeuristicsCosts(costs);
        }
      }
    };

    const stages: ObserverArgsWithPathFrom<T>[] = [];
    const shortestPathTree: ShortestPathTree<T> =
      sourceNode !== undefined
        ? dijstraks({
            graph,
            sourceNode,
            destinationNode,
            getHeuristicCost,
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

    return {
      heuristicCosts,
      onHarvestDistances,
      version,
      shortestPathTree,
      path,
      stages,
    };
  }, [
    heuristicCosts,
    getKey,
    getPositionOfNode,
    sourceNode,
    destinationNode,
    graph,
    version,
  ]);
};
