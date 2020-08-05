import React from "react";
import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

import {
  dijstraks,
  getPath,
} from "ocr-cs-alevel-ts/dist/algorithms/routing/dijkstras";
import { ShortestPathTree } from "ocr-cs-alevel-ts/dist/algorithms/routing/types";

export interface Props {
  sourceNode?: string;
  destinationNode?: string;
  graph: Graph<string>;
}

export interface UseRoutingAlgorithm {
  shortestPathTree: ShortestPathTree;
  path: string[];
}

export default ({
  sourceNode,
  destinationNode,
  graph,
}: Props): UseRoutingAlgorithm =>
  React.useMemo(() => {
    const shortestPathTree: ShortestPathTree =
      sourceNode !== undefined
        ? dijstraks({
            graph,
            sourceNode,
            destinationNode,
          })
        : {};
    const path =
      destinationNode !== undefined
        ? getPath(shortestPathTree, destinationNode)
        : [];
    path.reverse();

    return { shortestPathTree, path };
  }, [sourceNode, destinationNode, graph]);
