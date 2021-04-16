import { HackCpuTestRunner } from "comp-sci-maths-lib";
import React from "react";

interface Props {
  cpuTestRunner: HackCpuTestRunner;
}

const TestScriptTable: React.FunctionComponent<Props> = ({ cpuTestRunner }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default TestScriptTable;
