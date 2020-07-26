import React from "react";

import p5 from "p5";
import { ControlledInput } from "src/types";

interface Props extends ControlledInput<string> {
  sketches: { [name: string]: (s: p5) => void };
  className?: string;
}

const SketchPicker = ({ sketches, value, onChange, className }: Props) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(value),
    [onChange]
  );

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option />
      {Object.keys(sketches).map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default SketchPicker;
