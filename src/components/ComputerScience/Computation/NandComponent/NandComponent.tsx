import * as React from "react";
import NandChipPicker, { usePicker as useChipPicker } from "./NandChipPicker";
import useChip from "./useChip";

import "./nand.css";
import BusDisplay from "./BusDisplay";
import BusModify from "./BusModify";

const NandComponent: React.FunctionComponent = () => {
  const { chipName, componentProps: chipPickerProps } = useChipPicker(
    "form-control"
  );

  const {
    chip,
    clock: { count, state },
    onTickTock,
    pins,
    buses,
    onTogglePin,
  } = useChip(chipName);

  return (
    <div>
      NAND Gates
      <NandChipPicker {...chipPickerProps} />
      <h2>{chipName}</h2>
      <button className="btn btn-info btn-clock" onClick={onTickTock}>
        Clock 🕒
      </button>
      <div>
        Time: {count} {state ? "+" : ""}
      </div>
      <div>
        <h3>Inputs</h3>
        <div className="pinGroup">
          {Object.entries(pins)
            .filter(([name]) => chip.inputs.includes(name))
            .map(([name, value]) => (
              <BusModify
                key={name}
                name={name}
                values={[value]}
                onTogglePin={onTogglePin}
              />
            ))}
        </div>
        <div className="busGroup">
          {Object.entries(buses)
            .filter(([name]) => chip.inputs.includes(name))
            .map(([name, values]) => (
              <BusModify
                key={name}
                name={name}
                values={values}
                onTogglePin={onTogglePin}
              />
            ))}
        </div>

        <h3>Outputs</h3>
        <div className="pinGroup">
          {Object.entries(pins)
            .filter(([name]) => chip.outputs.includes(name))
            .map(([name, value]) => (
              <BusDisplay key={name} name={name} values={[value]} />
            ))}
        </div>
        <div className="busGroup">
          {Object.entries(buses)
            .filter(([name]) => chip.outputs.includes(name))
            .map(([name, values]) => (
              <BusDisplay key={name} name={name} values={values} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default NandComponent;
