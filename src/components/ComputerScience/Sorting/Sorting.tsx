import React from "react";
import { loremIpsum } from "lorem-ipsum";

import SortingAlgorithmPicker from "./SortingAlgorithmPicker";
import ListBuilder from "../../lib/ListBuilder";

import { NamedSort } from "ocr-cs-alevel-ts/dist/types";

const generateItem = () => loremIpsum({ count: 1, units: "words" });

const TEST_ITEMS: string[] = Array(5).fill(null).map(generateItem);

interface Props {}

const Sorting: React.FunctionComponent<Props> = ({}) => {
  const [algorithm, onAlgorithmChange] = React.useState<NamedSort | undefined>(
    undefined
  );
  const [inputList, setInputList] = React.useState<string[]>([]);

  const sortedList: string[] = React.useMemo(() => {
    if (!!algorithm) {
      return algorithm.sort(inputList, (a, b) => a.localeCompare(b));
    } else {
      // Just don't sort
      return inputList;
    }
  }, [algorithm, inputList]);

  return (
    <div>
      <h1>Sorting Algorithms</h1>

      <form>
        <label>Choose Algorithm</label>
        <SortingAlgorithmPicker
          value={algorithm}
          onChange={onAlgorithmChange}
        />
      </form>

      <h2>Build Raw List</h2>
      <ListBuilder initialItems={TEST_ITEMS} onChange={setInputList} />

      <h2>{!!algorithm ? algorithm.name : "please select"}</h2>
      {sortedList.join(", ")}
    </div>
  );
};

export default Sorting;
