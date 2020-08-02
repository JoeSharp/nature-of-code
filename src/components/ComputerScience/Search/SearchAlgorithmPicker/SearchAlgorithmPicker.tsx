import React from "react";

import algorithms from "ocr-cs-alevel-ts/dist/algorithms/search/monitored";
import { NamedSearch } from "ocr-cs-alevel-ts/dist/types";
import { ControlledInput } from "src/types";

interface Props extends ControlledInput<NamedSearch | undefined> {
  className?: string;
}

const SearchAlgorithmPicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) =>
      onChange(algorithms.find(({ name }) => name === value)),
    [onChange]
  );

  React.useEffect(() => onChange(algorithms[0]), [onChange]);

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

interface UsePicker {
  algorithm: NamedSearch | undefined;
  componentProps: Props;
}

export const useSearchAlgorithmPicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<NamedSearch | undefined>(undefined);

  return {
    algorithm: value,
    componentProps: {
      className,
      value,
      onChange,
    },
  };
};

export default SearchAlgorithmPicker;
