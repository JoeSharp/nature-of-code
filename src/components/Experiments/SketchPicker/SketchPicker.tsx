import * as React from "react";
import { useCallback } from "react";

import sketches from "../../../sketches";

interface Props {
  className?: string;
  value: string | undefined;
  onChange: (s: string) => void;
}

const SketchPicker = ({ value, onChange, className }: Props) => {
  const onSelectChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = useCallback(({ target: { value } }) => onChange(value), [onChange]);

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option />
      {Object.keys(sketches).map(s => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default SketchPicker;
