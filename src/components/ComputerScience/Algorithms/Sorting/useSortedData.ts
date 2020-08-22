import React from "react";
import { cloneDeep } from "lodash";

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
import { StringDataItem, DisplayDataItem } from "src/components/p5/Boid/types";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import BinaryTree from "comp-sci-maths-lib/dist/dataStructures/binaryTree/BinaryTree";

interface Props {
  algorithm?: NamedSort;
}

type StringListVertex = SplitListVertex<StringDataItem>;

const getSplitListVertex = <T extends DisplayDataItem<any>>({
  key,
  data,
}: SplitList<T>): SplitListVertex<T> => ({
  key,
  value: data,
  label: data.map((v) => v.label).join(","),
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
    let splitNodes: BinaryTree<StringListVertex> = new BinaryTree(
      (a: StringListVertex, b: StringListVertex) =>
        parseInt(a.key) - parseInt(b.key)
    );
    let joinNodes: Graph<SplitListVertex<StringDataItem>> = new Graph();
    let inputSplitList: SplitListVertex<StringDataItem> = {
      key: ROOT_RECURSION_KEY.toString(),
      value: inputList,
      label: "ROOT",
    };
    splitNodes.add(inputSplitList);

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
          splitNodes: cloneDeep(splitNodes),
          joinNodes: cloneDeep(joinNodes),
        };
        stages.push(lastObservation);
      },
      split: (
        thisKey: string,
        listA: SplitList<StringDataItem>,
        listB: SplitList<StringDataItem>
      ) => {
        [listA, listB]
          .map((l) => getSplitListVertex(l))
          .forEach((l) => splitNodes.add(l));
      },
      join: (
        listA: SplitList<StringDataItem>,
        listB: SplitList<StringDataItem>,
        joinedList: StringDataItem[]
      ) => {
        // const thisVertex = getSplitListVertex({
        //   key: thisKey,
        //   data: joinedList,
        // });
        [listA, listB].forEach((lKey) => {
          // const lVertex = splitNodes.getVertex(lKey);
          // if (lVertex !== undefined) {
          //   joinNodes.addUnidirectionalEdge(thisVertex, lVertex);
          // }
        });
      },
    };

    // Add explicit Start Observation
    stages.push({
      type: SortStageType.observation,
      stageName: "Starting",
      data: [...inputList],
      positionVars: {},
      splitNodes: cloneDeep(splitNodes),
      joinNodes: cloneDeep(joinNodes),
    });

    // Run the algorithm
    if (!!algorithm) {
      sortedData = algorithm.sort(inputList, sortUtilities);
    }

    // Add explicit End Observation
    stages.push({
      type: SortStageType.observation,
      stageName: "Finished",
      data: [...sortedData],
      positionVars: {},
      splitNodes: cloneDeep(splitNodes),
      joinNodes: cloneDeep(joinNodes),
    });

    return { sortedData, stages };
  }, [algorithm, inputList]);

  return { sortedData, stages };
};
export default useSortedData;
