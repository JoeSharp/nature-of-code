import React from "react";

import {
  stringComparator,
  generateRandomLetters,
} from "comp-sci-maths-lib/dist/common";
import { NamedSearch, SearchUtilities } from "comp-sci-maths-lib/dist/types";

import {
  SearchStage,
  SearchingData,
  SearchStageType,
  SearchObservation,
} from "./types";
import { NO_MATCH } from "comp-sci-maths-lib/dist/algorithms/search/common";
import { StringDataItem } from "src/components/p5/Boid/types";

interface Props {
  algorithm?: NamedSearch;
  searchItem: string;
}

const useSearchedData = ({
  algorithm,
  searchItem,
}: Props): SearchingData<StringDataItem> => {
  const data: StringDataItem[] = React.useMemo(
    () =>
      generateRandomLetters(20, { unique: true, sorted: true }).map((d, i) => ({
        key: i.toString(),
        label: d,
        value: d,
      })),
    []
  );

  const { matchIndex, stages } = React.useMemo(() => {
    let stages: SearchStage<StringDataItem>[] = [];
    let lastObservation: SearchObservation<StringDataItem>;

    const searchUtilities: SearchUtilities<StringDataItem> = {
      match: (a, index) => {
        const result = stringComparator(searchItem, a.value);
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
