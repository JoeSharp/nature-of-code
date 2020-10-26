import React from "react";

import useSudoku, { EMPTY_CELL, DIMENSION } from "./useSudoku";
import { Cell, CoordinateConsumer } from "./types";

import "./sudoku.css";

interface CellProps {
  cell: Cell;
  x: number;
  y: number;
  setBoard: CoordinateConsumer;
}

const CellComponent: React.FunctionComponent<CellProps> = ({
  x,
  y,
  cell,
  setBoard,
}) => {
  let classNames: string[] = ["sudoku-cell"];
  if (cell.error) {
    classNames.push("sudoku-cell-error");
  }
  if (cell.value === EMPTY_CELL) {
    classNames.push("sudoku-cell-hint");
  }
  return (
    <td className={classNames.join(" ")} onClick={() => setBoard({ x, y })}>
      {cell.value === EMPTY_CELL
        ? Array.from(cell.allowed).join(", ")
        : cell.value}
    </td>
  );
};

interface RowProps {
  x: number;
  row: Cell[];
  value: number;
  setBoard: CoordinateConsumer;
}

const RowComponent: React.FunctionComponent<RowProps> = ({
  x,
  row,
  setBoard,
  value,
}) => (
  <tr>
    {row.map((cell, y) => (
      <CellComponent key={y} {...{ x, y, cell, setBoard, value }} />
    ))}
  </tr>
);

const Sudoku: React.FunctionComponent = () => {
  const [value, setValue] = React.useState<number>(5);
  const { board, setBoard: _setBoard, autoSolveStep } = useSudoku();

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setValue(parseInt(value)),
    [setValue]
  );

  const setBoard: CoordinateConsumer = React.useCallback(
    ({ x, y }) => _setBoard({ x, y, value }),
    [value, _setBoard]
  );

  return (
    <div>
      <form>
        <div className="form-group">
          <input
            className="form-control"
            min={EMPTY_CELL}
            max={DIMENSION}
            type="number"
            value={value}
            onChange={onValueChange}
          />
        </div>
      </form>
      <button className="btn btn-primary" onClick={autoSolveStep}>
        Auto Solve Step
      </button>
      <table className="sudoku-table">
        <thead></thead>
        <tbody>
          {board.cells.map((row, x) => (
            <RowComponent key={x} {...{ x, setBoard, row, value }} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sudoku;
