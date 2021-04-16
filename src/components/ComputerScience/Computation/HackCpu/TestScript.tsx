import { HackCpuTestRunner } from "comp-sci-maths-lib";
import React from "react";
import Button from "src/components/Bootstrap/Buttons/Button";
import ProgramPickerDialog, {
  useDialog as useProgramPicker,
} from "../ProgramManager/ProgramPickerDialog";
import { LoadProgram } from "./types";

interface Props {
  cpuTestRunner: HackCpuTestRunner;
  loadScript: LoadProgram;
}

const TestScript: React.FunctionComponent<Props> = ({
  cpuTestRunner,
  loadScript,
}) => {
  const loadTestScript = React.useCallback(
    (programName, program) => {
      loadScript(programName, program);
    },
    [loadScript]
  );

  const {
    showDialog: showProgramPicker,
    componentProps: programPickerProps,
  } = useProgramPicker(loadTestScript);

  return (
    <div>
      <ProgramPickerDialog {...programPickerProps} />
      <h4>
        Test Script
        <Button
          className="title-button"
          text="Load"
          onClick={showProgramPicker}
          styleType="primary"
        />
      </h4>
      <div className="form-group">
        <label>Line Number</label>
        <input
          className="form-control"
          readOnly
          value={
            !!cpuTestRunner.lastInstruction
              ? cpuTestRunner.lastInstruction.lineNumber
              : 0
          }
        />
      </div>
      <div className="form-group">
        <table className="cpu-table code-text">
          <thead>
            <tr>
              <th>Line</th>
              <th>Instruction</th>
            </tr>
          </thead>
          <tbody>
            {(
              (!!cpuTestRunner.testScript &&
                cpuTestRunner.testScript.rawTestInstructions) ||
              []
            ).map(({ lineContent, lineNumber }, i) => (
              <tr
                key={i}
                className={
                  !!cpuTestRunner.lastInstruction &&
                  cpuTestRunner.lastInstruction.lineNumber === lineNumber
                    ? "highlighted"
                    : ""
                }
              >
                <td>{lineNumber}</td>
                <td>{lineContent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestScript;
