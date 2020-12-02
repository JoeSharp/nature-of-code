import { arithmeticComparator } from "comp-sci-maths-lib/dist/common";
import React from "react";
import useSketch from "src/components/p5/useSketch";
import SearchAlgorithmPicker, {
  usePicker as useSearchAlgorithmPicker,
} from "../Search/SearchAlgorithmPicker";
import SortAlgorithmPicker, {
  usePicker as useSortAlgorithmPicker,
} from "../Sorting/SortingAlgorithmPicker";

import AlgorithmTypePicker, {
  usePicker as useAlgorithmTypePicker,
} from "./AlgorithmTypePicker";
import BigOSketch from "./BigOSketch";

import useAlgorithmMeasure from "./useAlgorithmMeasure";

const DEFAULT_STEP: number = 1000;
const DEFAULT_SAMPLES: number = 20;
const DEFAULT_START_SIZE: number = 100;
const DEFAULT_END_SIZE: number = 10000;

const BigONotation: React.FunctionComponent = () => {
  const { componentProps: algorithmTypePickerProps } = useAlgorithmTypePicker(
    "form-control"
  );

  const {
    algorithm: searchAlgorithm,
    componentProps: searchAlgorithmPickerProps,
  } = useSearchAlgorithmPicker("form-control");
  const {
    algorithm: sortAlgorithm,
    componentProps: sortAlgorithmPickerProps,
  } = useSortAlgorithmPicker("form-control");

  const [step, setStep] = React.useState<number>(DEFAULT_STEP);
  const [samples, setSamples] = React.useState<number>(DEFAULT_SAMPLES);
  const [startSize, setStartSize] = React.useState<number>(DEFAULT_START_SIZE);
  const [endSize, setEndSize] = React.useState<number>(DEFAULT_END_SIZE);

  const algorithmWrapper = React.useCallback(
    (inputList: number[]) => {
      let numberOfComparisons: number = 0;
      if (algorithmTypePickerProps.value === "search" && !!searchAlgorithm) {
        const indexToFind = Math.floor(Math.random() * inputList.length);
        searchAlgorithm.search(inputList, inputList[indexToFind], {
          compare: (a, b) => {
            numberOfComparisons++;
            return arithmeticComparator(a, b);
          },
        });
      } else if (algorithmTypePickerProps.value === "sort" && !!sortAlgorithm) {
        sortAlgorithm.sort(inputList, {
          compare: (a, b) => {
            numberOfComparisons++;
            return arithmeticComparator(a, b);
          },
        });
      }

      return numberOfComparisons;
    },
    [algorithmTypePickerProps.value, sortAlgorithm, searchAlgorithm]
  );

  const measurements = useAlgorithmMeasure({
    startSize,
    endSize,
    step,
    samples,
    algorithmWrapper,
  });

  const onStepChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setStep(parseInt(value)),
    [setStep]
  );
  const onSamplesChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setSamples(parseInt(value)),
    [setSamples]
  );
  const onStartSizeChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setStartSize(parseInt(value)),
    [setStartSize]
  );
  const onEndSizeChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setEndSize(parseInt(value)),
    [setEndSize]
  );

  const { refContainer, updateConfig } = useSketch(BigOSketch);

  React.useEffect(() => updateConfig({ startSize, endSize, measurements }), [
    startSize,
    endSize,
    measurements,
    updateConfig,
  ]);

  return (
    <div>
      <div className="form-group">
        <label>Step</label>
        <input
          className="form-control"
          type="number"
          value={step}
          onChange={onStepChange}
        />
      </div>
      <div className="form-group">
        <label>Samples</label>
        <input
          className="form-control"
          type="number"
          value={samples}
          onChange={onSamplesChange}
        />
      </div>
      <div className="form-group">
        <label>Start Size</label>
        <input
          className="form-control"
          type="number"
          value={startSize}
          onChange={onStartSizeChange}
        />
      </div>
      <div className="form-group">
        <label>End Size</label>
        <input
          className="form-control"
          type="number"
          value={endSize}
          onChange={onEndSizeChange}
        />
      </div>

      <div className="form-group">
        <label>Algorithm Type</label>
        <AlgorithmTypePicker {...algorithmTypePickerProps} />
      </div>

      {algorithmTypePickerProps.value === "sort" && (
        <div className="form-group">
          <label>Sort Algorithm</label>
          <SortAlgorithmPicker {...sortAlgorithmPickerProps} />
        </div>
      )}

      {algorithmTypePickerProps.value === "search" && (
        <div className="form-group">
          <label>Search Algorithm</label>
          <SearchAlgorithmPicker {...searchAlgorithmPickerProps} />
        </div>
      )}

      <div ref={refContainer} />
    </div>
  );
};

export default BigONotation;
