import React from "react";

import SearchAlgorithmPicker, {
  useSearchAlgorithmPicker,
} from "./SearchAlgorithmPicker";

import SearchSketch from "./SearchSketch";
import useSearchedData from "./useSearchData";
import useItemInArray from "src/components/lib/useLoopCounter/useItemInArray";
import { SearchStage } from "./types";
import { useToggledInterval } from "src/components/lib/useInterval";
import useSketch from "src/components/p5/P5Sketch/useSketch";

const Searching: React.FunctionComponent = () => {
  const {
    algorithm,
    componentProps: algorithmPickerProps,
  } = useSearchAlgorithmPicker("form-control");

  const [searchItem, setSearchItem] = React.useState<string>("");
  const onSearchItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setSearchItem(value),
    [setSearchItem]
  );

  const { data, matchIndex, stages } = useSearchedData({
    algorithm,
    searchItem,
  });

  const { updateConfig, sketchContainer, refContainer } = useSketch(
    SearchSketch
  );
  const {
    index,
    item: searchStage,
    reset,
    stepBackward,
    stepForward,
  } = useItemInArray<SearchStage<string>>({ items: stages });

  // Whenever the sort is redone, tell the sketch
  React.useEffect(() => {
    updateConfig({
      data,
      matchIndex,
      searchStage,
      searchItem,
      isFinalStage: index === stages.length - 1,
    });
  }, [
    index,
    stages.length,
    data,
    matchIndex,
    searchStage,
    searchItem,
    updateConfig,
  ]);

  React.useEffect(() => {
    reset();
    sketchContainer.reset();
  }, [reset, sketchContainer, algorithm]);

  // Only auto iterate forward if we aren't on the final step
  const autoStepForward = React.useCallback(() => {
    if (index < stages.length - 1) {
      stepForward();
    }
  }, [index, stages.length, stepForward]);

  const {
    isAutoIterating,
    onChange: onAutoIterateChange,
  } = useToggledInterval({ iterate: autoStepForward, interval: 500 });

  return (
    <div>
      <h1>Searching Algorithms</h1>

      <form>
        <div className="form-group">
          <label>Choose Algorithm</label>
          <SearchAlgorithmPicker {...algorithmPickerProps} />
        </div>
      </form>

      <h2>{!!algorithm ? algorithm.name : "please select algorithm"}</h2>
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isAutoIterating}
            onChange={onAutoIterateChange}
            id="chkAutoIterate"
          />
          <label className="form-check-label" htmlFor="chkAutoIterate">
            Auto Iterate
          </label>
        </div>
        <div className="form-group">
          <label>Search Item</label>
          <input
            className="form-control"
            value={searchItem}
            onChange={onSearchItemChange}
          />
        </div>
        <button className="btn btn-danger" onClick={reset}>
          Reset
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={stepBackward}>
          Back
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={stepForward}>
          Forward
        </button>
      </div>

      <div ref={refContainer} />
    </div>
  );
};

export default Searching;
