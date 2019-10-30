import React from "react";

import { PageGraph, PageRanks } from "./types";

const MAX_ITERATIONS = 20;

interface Props {
  dampingFactor: number;
  graph: PageGraph;
}

interface UsePageRank {
  iterations: number;
  ranks: PageRanks;
  rankHistory: PageRanks[];
  begin: () => void;
  iterate: () => void;
}

interface IterateAction {
  type: "iterate";
}

interface InitialiseAction {
  type: "initialise";
  dampingFactor: number;
  graph: PageGraph;
}

interface RankReducerState {
  iterations: number;
  graph: PageGraph;
  dampingFactor: number;
  ranks: PageRanks;
  rankHistory: PageRanks[];
}
type RankReducerAction = IterateAction | InitialiseAction;

export const roundTo2Dp = (x: number) =>
  x !== undefined ? parseFloat(x.toFixed(2)) : 0;

const rankReducer = (
  { iterations, graph, ranks, rankHistory, dampingFactor }: RankReducerState,
  action: RankReducerAction
): RankReducerState => {
  switch (action.type) {
    case "iterate": {
      if (iterations > MAX_ITERATIONS) {
        return {
          iterations,
          graph,
          ranks,
          rankHistory,
          dampingFactor
        };
      }

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

        newRanks[page] = 1 - dampingFactor + dampingFactor * rank;
      });

      return {
        iterations: iterations + 1,
        graph,
        ranks: newRanks,
        rankHistory: [...rankHistory, newRanks],
        dampingFactor
      };
    }
    case "initialise":
      return {
        iterations: 0,
        graph: action.graph,
        ranks: action.graph.pages.reduce(
          (acc, curr) => ({ ...acc, [curr]: 1 }),
          {}
        ),
        rankHistory: [],
        dampingFactor: action.dampingFactor
      };
  }
};

const usePageRank = ({ graph, dampingFactor }: Props): UsePageRank => {
  const [rankState, dispatch] = React.useReducer(rankReducer, {
    iterations: 0,
    graph,
    ranks: {},
    rankHistory: [],
    dampingFactor: 0.85
  });

  const iterate = React.useCallback(() => dispatch({ type: "iterate" }), []);

  const begin = React.useCallback(
    () => dispatch({ type: "initialise", graph, dampingFactor }),
    [graph, dampingFactor]
  );

  React.useEffect(begin, [begin]);
  const { ranks, iterations, rankHistory } = rankState;

  return {
    iterations,
    ranks,
    rankHistory: [ranks, ...rankHistory],
    begin: begin,
    iterate
  };
};

export default usePageRank;
