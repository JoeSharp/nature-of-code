import React from "react";

import { ControlledInput } from "src/types";
import { graphTraversalAlgorithms, BREADTH_FIRST_SEARCH } from "./common";

interface Props extends ControlledInput<string> {
  className?: string;
}

const GraphTraversalAlgorithmPicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(value),
    [onChange]
  );

  React.useEffect(() => onChange(BREADTH_FIRST_SEARCH), [onChange]);

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option />
      {graphTraversalAlgorithms.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

interface UsePicker<T> {
  algorithmName: string;
  componentProps: Props;
}

export const usePicker = <T,>(className?: string): UsePicker<T> => {
  const [value, onChange] = React.useState<string>(BREADTH_FIRST_SEARCH);

  return {
    algorithmName: value,
    componentProps: {
      className,
      value,
      onChange,
    },
  };
};

export default GraphTraversalAlgorithmPicker;
