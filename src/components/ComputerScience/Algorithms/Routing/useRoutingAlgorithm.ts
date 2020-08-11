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
  RoutingObserver,
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
  onResetDistances: () => void;
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

  const getHeuristicCost: HeuristicCostFunction<T> = React.useCallback(
    (vertex: T) =>
      heuristicCosts[getKey(vertex)]
        ? heuristicCosts[getKey(vertex)].distance
        : 0,
    [heuristicCosts, getKey]
  );

  const onResetDistances = React.useCallback(() => setHeuristicsCosts({}), [
    setHeuristicsCosts,
  ]);

  const onHarvestDistances = React.useCallback(() => {
    if (destinationNode !== undefined && version !== undefined) {
      const destinationPosition = getPositionOfNode(destinationNode);
      if (!!destinationPosition) {
        const costs: HeuristicCostById = graph.vertices
          .map((vertex) => ({
            vertex,
            position: getPositionOfNode(vertex) || destinationPosition,
          }))
          .map(({ vertex, position }) => ({
            vertex,
            position,
            distance: p5.Vector.sub(position, destinationPosition).mag(),
          }))
          .reduce(
            (acc, { position, vertex, distance }) => ({
              ...acc,
              [getKey(vertex)]: { position, distance },
            }),
            {}
          );

        setHeuristicsCosts(costs);
      }
    }
  }, [
    version,
    destinationNode,
    getPositionOfNode,
    getKey,
    graph.vertices,
    setHeuristicsCosts,
  ]);

  const { stages, shortestPathTree, path } = React.useMemo(() => {
    const stages: ObserverArgsWithPathFrom<T>[] = [];
    const observer: RoutingObserver<T> = ({
      shortestPathTree,
      currentDistances,
      currentItem,
      outgoing,
    }) => {
      const endNode: T =
        currentItem !== undefined && currentItem.viaNode !== undefined
          ? currentItem.viaNode
          : destinationNode !== undefined
          ? destinationNode
          : (sourceNode as T);
      const observerArgs: ObserverArgsWithPathFrom<T> = {
        currentItem,
        currentDistances,
        shortestPathTree,
        outgoing,
        pathFrom: [
          ...getPathTo({
            graph,
            shortestPathTree,
            node: endNode,
          }),
          endNode,
        ],
      };
      stages.push(cloneDeep(observerArgs));
    };
    const shortestPathTree: ShortestPathTree<T> =
      sourceNode !== undefined
        ? dijstraks({
            graph,
            sourceNode,
            destinationNode,
            getHeuristicCost,
            observer,
          })
        : {};
    const path =
      destinationNode !== undefined
        ? getPathTo({ graph, shortestPathTree, node: destinationNode })
        : [];

    return {
      version,
      shortestPathTree,
      path,
      stages,
    };
  }, [getHeuristicCost, sourceNode, destinationNode, version, graph]);

  return {
    stages,
    shortestPathTree,
    path,
    heuristicCosts,
    onHarvestDistances,
    onResetDistances,
  };
};
