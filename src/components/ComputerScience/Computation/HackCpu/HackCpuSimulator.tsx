import React from "react";

import ROMTable from "./ROMTable";
import RAMTable from "./RAMTable";
import useHackCpuSimulator from "./useHackCpuSimulator";
import HackAsmProgramManager from "./ProgramManager/ProgramManager";
import NumberBasePicker, {
  usePicker as useNumberBasePicker,
} from "./NumberBasePicker";

import StepForwardControls, {
  useStepForwardControls,
} from "src/components/lib/StepForwardControls";

import "./cpuSimulator.css";
import Button from "src/components/Bootstrap/Buttons/Button";
import ALUDisplay from "./ALUDisplay";

const HackCpuSimulator: React.FunctionComponent = () => {
  const [showProgramManager, toggleProgramManager] = React.useReducer(
    (b) => !b,
    false
  );

  const { numberBase, componentProps } = useNumberBasePicker("form-control");

  const {
    version,
    cpu,
    setRamValue,
    loadProgram,
    reset,
    tick,
  } = useHackCpuSimulator(numberBase);

  const { componentProps: stepForwardProps } = useStepForwardControls({
    reset,
    iterate: tick,
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <Button
            onClick={toggleProgramManager}
            text={`${showProgramManager ? "Hide" : "Show"} Program Editor`}
            styleType="success"
          />
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Play Controls</label>
            <StepForwardControls {...stepForwardProps} />
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <label>Number Base</label>
            <NumberBasePicker {...componentProps} />
          </div>
        </div>
      </div>

      {showProgramManager && <HackAsmProgramManager />}

      <div className="row">
        <div className="col-md-3">
          <ROMTable
            cpu={cpu}
            numberBase={numberBase}
            loadProgram={loadProgram}
          />
        </div>
        <div className="col-md-3">
          <RAMTable
            cpu={cpu}
            numberBase={numberBase}
            setRamValue={setRamValue}
          />
        </div>
        <div className="col-md-6">
          <ALUDisplay cpu={cpu} numberBase={numberBase} />
        </div>
      </div>
      <div className="hidden-version">{version}</div>
    </div>
  );
};

export default HackCpuSimulator;
