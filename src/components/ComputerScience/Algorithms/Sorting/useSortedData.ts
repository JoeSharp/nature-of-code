import React from "react";

import {
  stringComparator,
  generateRandomLetters,
  simpleSwap,
  ROOT_RECURSION_KEY,
} from "comp-sci-maths-lib/dist/common";
import {
  NamedSort,
  SortUtility,
  SplitList,
} from "comp-sci-maths-lib/dist/types";

import {
  SortStage,
  SortingData,
  SortStageType,
  SortObservation,
  SplitListVertex,
} from "./types";
import { NO_MATCH } from "comp-sci-maths-lib/dist/algorithms/search/common";
import { StringDataItem } from "src/components/p5/Boid/types";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

interface Props {
  algorithm?: NamedSort;
}

const getSplitListVertex = <T>({
  key,
  data,
}: SplitList<T>): SplitListVertex<T> => ({
  key,
  value: data,
});

const useSortedData = ({ algorithm }: Props): SortingData<StringDataItem> => {
  const inputList: StringDataItem[] = React.useMemo(
    () =>
      generateRandomLetters(10, { sorted: false }).map((d, i) => ({
        key: i.toString(),
        label: d,
        value: d,
      })),
    []
  );
  const {
    sortedData,
    stages,
  }: SortingData<StringDataItem> = React.useMemo(() => {
    let sortedData = inputList;
    let stages: SortStage<StringDataItem>[] = [];
    let lastObservation: SortObservation<StringDataItem>;
    let splitNodes: Graph<SplitListVertex<StringDataItem>> = new Graph();
    let inputSplitList: SplitListVertex<StringDataItem> = {
      key: ROOT_RECURSION_KEY,
      value: inputList,
    };
    splitNodes.addVertex(inputSplitList);

    const sortUtilities: SortUtility<StringDataItem> = {
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
        const result = stringComparator(a.value, b.value, meta);
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
      split: (
        thisKey: string,
        listA: SplitList<StringDataItem>,
        listB: SplitList<StringDataItem>
      ) => {
        let thisVertex = splitNodes.getVertex(thisKey);
        if (thisVertex !== undefined) {
          splitNodes.addUnidirectionalEdge(
            thisVertex,
            getSplitListVertex(listA)
          );
          splitNodes.addUnidirectionalEdge(
            thisVertex,
            getSplitListVertex(listB)
          );
        }
      },
      join: (
        thisKey: string,
        listAKey: string,
        listBKey: string,
        joinedList: StringDataItem[]
      ) => {},
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
      data: [...sortedData],
      positionVars: {},
    });

    return { sortedData, stages };
  }, [algorithm, inputList]);

  return { sortedData, stages };
};
export default useSortedData;
