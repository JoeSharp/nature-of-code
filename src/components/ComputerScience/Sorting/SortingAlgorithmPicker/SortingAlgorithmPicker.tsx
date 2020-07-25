import React from "react";

import algorithms from "ocr-cs-alevel-ts/dist/algorithms/sort";
import { NamedSort } from "ocr-cs-alevel-ts/dist/types";

interface Props extends ControlledInput<NamedSort | undefined> {
  className?: string;
}

const SortingAlgorithmPicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) =>
      onChange(algorithms.find(({ name }) => name === value)),
    [onChange]
  );

  return (
    <select
      className={className}
      onChange={onSelectChange}
      value={value && value.name}
    >
      <option />
      {algorithms.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default SortingAlgorithmPicker;
