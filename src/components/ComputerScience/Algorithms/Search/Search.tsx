import React from "react";

import SearchAlgorithmPicker, {
  useSearchAlgorithmPicker,
} from "./SearchAlgorithmPicker";

import SearchSketch from "./SearchSketch";
import useSearchedData from "./useSearchData";
import useSketch from "src/components/p5/useSketch";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";

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

  const {
    index,
    item: searchStage,
    componentProps: steppingControlProps,
  } = useSteppingControls(stages);

  const { updateConfig, sketchContainer, refContainer } = useSketch(
    SearchSketch
  );

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
    steppingControlProps.reset();
    sketchContainer.reset();
  }, [steppingControlProps, sketchContainer, algorithm, searchItem]);

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
        <div className="form-group">
          <label>Search Item</label>
          <input
            className="form-control"
            value={searchItem}
            onChange={onSearchItemChange}
          />
        </div>
        <SteppingControls {...steppingControlProps} />
      </div>

      <div ref={refContainer} />
    </div>
  );
};

export default Searching;
