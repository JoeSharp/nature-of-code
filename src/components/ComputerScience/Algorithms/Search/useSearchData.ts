import React from "react";

import {
  stringComparator,
  generateRandomLetters,
} from "ocr-cs-alevel-ts/dist/algorithms/common";
import { NamedSearch, SearchUtilities } from "ocr-cs-alevel-ts/dist/types";

import {
  SearchStage,
  SearchingData,
  SearchStageType,
  SearchObservation,
} from "./types";
import { NO_MATCH } from "ocr-cs-alevel-ts/dist/algorithms/search/common";

interface Props {
  algorithm?: NamedSearch;
  searchItem: string;
}

const useSearchedData = ({
  algorithm,
  searchItem,
}: Props): SearchingData<string> => {
  let data: string[] = React.useMemo(
    () => generateRandomLetters(10).sort(),
    []
  );

  const { matchIndex, stages } = React.useMemo(() => {
    let stages: SearchStage<string>[] = [];
    let lastObservation: SearchObservation<string>;

    const searchUtilities: SearchUtilities<string> = {
      match: (a, index) => {
        const result = stringComparator(searchItem, a);
        stages.push({
          type: SearchStageType.match,
          index,
          result,
          lastObservation,
        });
        return result;
      },
      observe: (stageName, positionVars) => {
        lastObservation = {
          type: SearchStageType.observation,
          stageName,
          positionVars: { ...positionVars },
        };
        stages.push(lastObservation);
      },
    };

    // Add explicit Start Observation
    stages.push({
      type: SearchStageType.observation,
      stageName: "Starting",
      positionVars: {},
    });

    // Run the algorithm
    let matchIndex: number = NO_MATCH;
    if (!!algorithm) {
      matchIndex = algorithm.search(data, searchUtilities);
    }

    // Add explicit End Observation
    stages.push({
      type: SearchStageType.observation,
      stageName: "Finished",
      positionVars: {
        matchIndex,
      },
    });

    return { matchIndex, stages };
  }, [data, searchItem, algorithm]);

  return {
    data,
    searchItem,
    matchIndex,
    stages,
  };
};
export default useSearchedData;
