import React from "react";

import { PageRanks } from "./types";
import {
  initialisePageRank,
  iteratePageRank,
  BLANK_PAGE_RANK_STATE,
} from "ocr-cs-alevel-ts/dist/algorithms/pageRank/pageRank";
import { PageRankState } from "ocr-cs-alevel-ts/dist/algorithms/pageRank/types";
import { GraphData } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

interface Props {
  dampingFactor: number;
  graphData: GraphData<string>;
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
  graphData: GraphData<string>;
}

type RankReducerAction = IterateAction | InitialiseAction;

const rankReducer = (
  state: PageRankState,
  action: RankReducerAction
): PageRankState => {
  switch (action.type) {
    case "iterate": {
      return iteratePageRank(state);
    }
    case "initialise":
      return initialisePageRank(action.graphData, action.dampingFactor);
  }
};

const usePageRank = ({ graphData, dampingFactor }: Props): UsePageRank => {
  const [rankState, dispatch] = React.useReducer(
    rankReducer,
    BLANK_PAGE_RANK_STATE
  );

  const iterate = React.useCallback(() => dispatch({ type: "iterate" }), []);

  const begin = React.useCallback(
    () => dispatch({ type: "initialise", graphData, dampingFactor }),
    [graphData, dampingFactor]
  );

  React.useEffect(begin, [begin]);
  const { ranks, iterations, rankHistory } = rankState;

  return {
    iterations,
    ranks,
    rankHistory,
    begin: begin,
    iterate,
  };
};

export default usePageRank;
