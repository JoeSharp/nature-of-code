import React from "react";

import { PageGraph, PageRanks } from "./types";

const DAMPING_FACTOR = 0.85;

interface Props {
  graph: PageGraph;
}

interface UsePageRank {
  iterations: number;
  ranks: PageRanks;
  begin: () => void;
  iterate: () => void;
}

interface IterateAction {
  type: "iterate";
}

interface InitialiseAction {
  type: "initialise";
  graph: PageGraph;
}

interface RankReducerState {
  iterations: number;
  graph: PageGraph;
  ranks: PageRanks;
}
type RankReducerAction = IterateAction | InitialiseAction;

export const roundTo2Dp = (x: number) =>
  x !== undefined ? parseFloat(x.toFixed(2)) : 0;

const rankReducer = (
  { iterations, graph, ranks }: RankReducerState,
  action: RankReducerAction
): RankReducerState => {
  switch (action.type) {
    case "iterate": {
      const newRanks: PageRanks = { ...ranks };

      graph.pages.forEach(page => {
        let rank: number = graph.links
          .filter(link => link.to === page)
          .map(link => link.from)
          .map(
            incoming =>
              newRanks[incoming] /
              graph.links.filter(l => l.from === incoming).length
          )
          .reduce((acc, curr) => acc + curr, 0);

        newRanks[page] = 1 - DAMPING_FACTOR + DAMPING_FACTOR * rank;
      });

      return {
        iterations: iterations + 1,
        graph,
        ranks: newRanks
      };
    }
    case "initialise":
      return {
        iterations: 0,
        graph: action.graph,
        ranks: action.graph.pages.reduce(
          (acc, curr) => ({ ...acc, [curr]: 1 }),
          {}
        )
      };
  }
};

const usePageRank = ({ graph }: Props): UsePageRank => {
  const [rankState, dispatch] = React.useReducer(rankReducer, {
    iterations: 0,
    graph,
    ranks: {}
  });

  const iterate = React.useCallback(() => dispatch({ type: "iterate" }), []);

  const begin = React.useCallback(
    () => dispatch({ type: "initialise", graph }),
    [graph]
  );

  React.useEffect(begin, [begin]);
  const { ranks, iterations } = rankState;

  return { iterations, ranks, begin: begin, iterate };
};

export default usePageRank;
