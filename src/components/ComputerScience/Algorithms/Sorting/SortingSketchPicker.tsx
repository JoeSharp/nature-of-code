import React from "react";

import { ControlledInput } from "src/types";
import { SortSketchType } from "./types";

interface SortSketchTypeOption {
  name: string;
  sketchType: SortSketchType;
}

const sketchTypeOptions: SortSketchTypeOption[] = [
  { name: "In Place", sketchType: SortSketchType.inPlace },
  { name: "Recursive", sketchType: SortSketchType.recursive },
];

const getValueByName = (name: string): SortSketchTypeOption =>
  sketchTypeOptions.filter((o) => o.name === name).find(() => true) ||
  sketchTypeOptions[0];
const getValueByEnum = (
  sketchType: SortSketchType | undefined
): SortSketchTypeOption =>
  sketchTypeOptions
    .filter((o) => o.sketchType === sketchType)
    .find(() => true) || sketchTypeOptions[0];

interface Props extends ControlledInput<SortSketchType> {
  className?: string;
}

const SortingSketchPicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(getValueByName(value).sketchType),
    [onChange]
  );

  React.useEffect(() => onChange(sketchTypeOptions[0].sketchType), [onChange]);

  return (
    <select
      className={className}
      onChange={onSelectChange}
      value={getValueByEnum(value).name}
    >
      <option />
      {sketchTypeOptions.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  sketchType: SortSketchType | undefined;
  componentProps: Props;
}

export const usePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<SortSketchType | undefined>(
    undefined
  );

  return {
    sketchType: value,
    componentProps: React.useMemo(
      () => ({
        className,
        value,
        onChange,
      }),
      [className, value, onChange]
    ),
  };
};

export default SortingSketchPicker;
