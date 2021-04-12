import { toSymbolicAsm } from "comp-sci-maths-lib/dist/computation/assemblyLanguage/hackAssembler";
import React from "react";
import { HackCpu } from "comp-sci-maths-lib";
import { INumberBase } from "comp-sci-maths-lib/dist/dataRepresentation/numberBases/types";
import { MAX_TABLE_ROWS } from "./types";
import StartAddressDialog, {
  useDialog as useStartAddressDialog,
} from "./StartAddressDialog";
import Button from "src/components/Bootstrap/Buttons/Button";

interface Props {
  cpu: HackCpu;
  numberBase: INumberBase;
}

const ProgramMemoryTable: React.FunctionComponent<Props> = ({
  cpu: { programCounter, namedRegisters, program },
  numberBase,
}) => {
  const {
    startAddress,
    showDialog: showStartAddressDialog,
    componentProps: startAddressProps,
  } = useStartAddressDialog({
    numberBase,
    maxAddress: program.length,
  });

  return (
    <div>
      <h4>
        ROM
        <Button
          className="title-button"
          text="Search"
          onClick={showStartAddressDialog}
          styleType="primary"
        />
      </h4>
      <div className="form-group">
        <label>PC</label>
        <input
          className="form-control"
          readOnly
          value={numberBase.toString(programCounter)}
        />
      </div>
      <table className="cpu-table code-text">
        <thead>
          <tr>
            <th>Line</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {program
            .filter(
              (p, i) => i >= startAddress && i < startAddress + MAX_TABLE_ROWS
            )
            .map((p, i) => (
              <tr
                key={i}
                className={
                  startAddress + i === programCounter ? "highlighted" : ""
                }
              >
                <td>{numberBase.toString(i)}</td>
                <td>{toSymbolicAsm(p, namedRegisters)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <StartAddressDialog {...startAddressProps} />
    </div>
  );
};

export default ProgramMemoryTable;
