import React from "react";

import {
  stringComparator,
  generateRandomLetters,
  simpleSwap,
} from "ocr-cs-alevel-ts/dist/algorithms/common";
import { NamedSort, SortUtility } from "ocr-cs-alevel-ts/dist/types";

import {
  SortStage,
  SortingData,
  SortStageType,
  SortObservation,
} from "./types";
import { NO_MATCH } from "ocr-cs-alevel-ts/dist/algorithms/search/common";

interface Props {
  algorithm?: NamedSort;
}

interface UseSortedData {
  sortingData: SortingData<string>;
}

const useSortedData = ({ algorithm }: Props): UseSortedData => {
  const inputList = React.useMemo(() => generateRandomLetters(10), []);
  const sortingData: SortingData<string> = React.useMemo(() => {
    let sortedData = inputList;
    let stages: SortStage<string>[] = [];
    let lastObservation: SortObservation<string>;

    const sortUtilities: SortUtility<string> = {
      swap: (data, from, to) => {
        stages.push({
          type: SortStageType.swap,
          from,
          to,
          lastObservation,
        });
        simpleSwap(data, from, to);
      },
      compare: (a, b, meta) => {
        const result = stringComparator(a, b, meta);
        stages.push({
          type: SortStageType.compare,
          a,
          b,
          aIndex: !!meta ? meta.aIndex : NO_MATCH,
          bIndex: !!meta ? meta.bIndex : NO_MATCH,
          result,
          lastObservation,
        });
        return result;
      },
      observe: (stageName, data, positionVars) => {
        lastObservation = {
          type: SortStageType.observation,
          stageName,
          data: [...data],
          positionVars: { ...positionVars },
        };
        stages.push(lastObservation);
      },
    };

    // Add explicit Start Observation
    stages.push({
      type: SortStageType.observation,
      stageName: "Starting",
      data: [...inputList],
      positionVars: {},
    });

    // Run the algorithm
    if (!!algorithm) {
      sortedData = algorithm.sort(inputList, sortUtilities);
    }

    // Add explicit Start Observation
    stages.push({
      type: SortStageType.observation,
      stageName: "Finished",
      data: [...inputList],
      positionVars: {},
    });

    return { sortedData, stages };
  }, [algorithm, inputList]);

  return { sortingData };
};
export default useSortedData;
