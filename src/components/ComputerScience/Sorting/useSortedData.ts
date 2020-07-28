import React from "react";

import { stringComparator } from "ocr-cs-alevel-ts/dist/algorithms/common";
import { SortObserver, NamedSort } from "ocr-cs-alevel-ts/dist/types";

import { SortStage, SortingData } from "./types";

import { generateRandomLetters } from "./common";

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
    const sortObserver: SortObserver<string> = (
      stageName,
      data,
      positionVars
    ) => {
      stages.push({
        stageName,
        data: [...data],
        positionVars: { ...positionVars },
      });
    };

    // Run the algorithm
    if (!!algorithm) {
      sortedData = algorithm.sort(inputList, stringComparator, sortObserver);
    }

    return { sortedData, stages };
  }, [algorithm, inputList]);

  return { sortingData };
};
export default useSortedData;
