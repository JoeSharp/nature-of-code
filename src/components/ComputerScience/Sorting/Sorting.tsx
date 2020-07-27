import React from "react";
import { loremIpsum } from "lorem-ipsum";

import { stringComparator } from "ocr-cs-alevel-ts/dist/algorithms/common";
import { SortObserver } from "ocr-cs-alevel-ts/dist/types";

import SortingAlgorithmPicker, {
  useSortingAlgorithmPicker,
} from "./SortingAlgorithmPicker";
import ListBuilder from "src/components/lib/ListBuilder";
import useSketch from "src/components/p5/P5Sketch/useSketch";
import SortingSketch from "./SortingSketch";
import { SortingData, SortStage } from "./types";
import useItemInArray from "src/components/lib/useLoopCounter/useItemInArray";

const generateItem = () => loremIpsum({ count: 1, units: "words" });

const TEST_ITEMS: string[] = Array(5).fill(null).map(generateItem);

const Sorting: React.FunctionComponent = () => {
  const {
    algorithm,
    componentProps: algorithmPickerProps,
  } = useSortingAlgorithmPicker();
  const [inputList, setInputList] = React.useState<string[]>([]);

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

    if (!!algorithm) {
      sortedData = algorithm.sort(inputList, stringComparator, sortObserver);
    }
    stages.push({ stageName: "Done", data: sortedData, positionVars: {} });

    return { sortedData, stages };
  }, [algorithm, inputList]);

  const { updateConfig, refContainer } = useSketch(SortingSketch);
  const { item: sortStage, stepBackward, stepForward } = useItemInArray<
    SortStage<string>
  >({ items: sortingData.stages });

  // Whenever the sort is redone, tell the sketch
  React.useEffect(() => updateConfig({ sortStage }), [sortStage, updateConfig]);

  return (
    <div>
      <h1>Sorting Algorithms</h1>

      <form>
        <label>Choose Algorithm</label>
        <SortingAlgorithmPicker {...algorithmPickerProps} />
      </form>

      <h2>Build Raw List</h2>
      <ListBuilder initialItems={TEST_ITEMS} onChange={setInputList} />

      <h2>{!!algorithm ? algorithm.name : "please select"}</h2>
      {sortingData.sortedData.join(", ")}

      <div>
        <button className="btn btn-primary" onClick={stepBackward}>
          Back
        </button>
        <button className="btn btn-primary" onClick={stepForward}>
          Forward
        </button>
      </div>

      <div ref={refContainer} />
    </div>
  );
};

export default Sorting;
