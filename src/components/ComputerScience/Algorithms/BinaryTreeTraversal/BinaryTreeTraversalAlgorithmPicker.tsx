import React from "react";

import { ControlledInput } from "src/types";
import { binaryTreeTraversalAlgorithms } from "./common";

interface Props extends ControlledInput<string> {
  className?: string;
}

const BinaryTreeTraversalAlgorithmPicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(value),
    [onChange]
  );

  React.useEffect(() => onChange(binaryTreeTraversalAlgorithms[0]), [onChange]);

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option />
      {binaryTreeTraversalAlgorithms.map((value) => (
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
  const [value, onChange] = React.useState<string>(
    binaryTreeTraversalAlgorithms[0]
  );

  return {
    algorithmName: value,
    componentProps: {
      className,
      value,
      onChange,
    },
  };
};

export default BinaryTreeTraversalAlgorithmPicker;
