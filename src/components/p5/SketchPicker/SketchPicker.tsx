import * as React from "react";
import { useCallback } from "react";

import p5 from "p5";

interface Props {
  sketches: { [name: string]: (s: p5) => void };
  className?: string;
  value: string | undefined;
  onChange: (s: string) => void;
}

const SketchPicker = ({ sketches, value, onChange, className }: Props) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
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
