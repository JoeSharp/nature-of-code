import React from "react";
import { depthFirstSearch, breadthFirstSearch } from "comp-sci-maths-lib/dist/";
import { VisitFunction, AnyGraphVertex } from "comp-sci-maths-lib/dist/types";

import { BREADTH_FIRST_SEARCH, DEPTH_FIRST_SEARCH } from "./common";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

interface Props<T extends AnyGraphVertex> {
  algorithmName: string;
  graph: Graph<T>;
  startVertex?: T;
}

export interface UseGraphTraversal<T> {
  visitedItems: T[];
}

const useGraphTraversal = <T extends AnyGraphVertex>({
  algorithmName,
  graph,
  startVertex,
}: Props<T>): UseGraphTraversal<T> => {
  const visitedItems: T[] = React.useMemo(() => {
    const items: T[] = [];
    const visit: VisitFunction<T> = (d: T) => items.push(d);

    if (startVertex !== undefined) {
      switch (algorithmName) {
        case BREADTH_FIRST_SEARCH:
          breadthFirstSearch(graph, startVertex.key, visit);
          break;
        case DEPTH_FIRST_SEARCH:
          depthFirstSearch(graph, startVertex.key, visit);
          break;
      }
    }

    return items;
  }, [algorithmName, graph, startVertex]);

  return { visitedItems };
};

export default useGraphTraversal;
