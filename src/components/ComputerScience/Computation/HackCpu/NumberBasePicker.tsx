import React from "react";

import { ControlledInput } from "src/types";
import { binary, denary, hexadecimal, NumberBase } from "comp-sci-maths-lib";

const NUMBER_BASES: NumberBase[] = [denary, binary.withPadding(16), hexadecimal.withPadding(4)]

interface Props extends ControlledInput<NumberBase> {
  className?: string;
}

const NumberBasePicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => {
      const found = NUMBER_BASES.find(({ name }) => name === value);
      if (found !== undefined) {
        onChange(found)
      }
    },
    [onChange]
  );

  React.useEffect(() => onChange(NUMBER_BASES[0]), [onChange]);

  return (
    <select
      className={className}
      onChange={onSelectChange}
      value={value && value.name}
    >
      <option />
      {NUMBER_BASES.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  numberBase: NumberBase;
  componentProps: Props;
}

export const usePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<NumberBase>(
    denary
  );

  return {
    numberBase: value,
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

export default NumberBasePicker;
