import React from "react";

import {
  Coordinate,
  GetOtherCellsFunction,
  BoardActionConsumer,
  BoardAction,
  BoardState,
} from "./types";

export const EMPTY_CELL = -1;
export const SUB_DIMENSION = 3;
export const DIMENSION = Math.pow(SUB_DIMENSION, 2);
export const DIGITS = Array(DIMENSION)
  .fill(null)
  .map((_, i) => i + 1);

const getRowCells: GetOtherCellsFunction = (
  x: number,
  y: number
): Coordinate[] =>
  Array(DIMENSION)
    .fill(null)
    .map((_, i) => ({ x: i, y }));
const getColCells: GetOtherCellsFunction = (
  x: number,
  y: number
): Coordinate[] =>
  Array(DIMENSION)
    .fill(null)
    .map((_, i) => ({ x, y: i }));
const getSquareCells: GetOtherCellsFunction = (
  x: number,
  y: number
): Coordinate[] => {
  let coords: Coordinate[] = [];
  let xFloor = Math.floor(x / SUB_DIMENSION) * SUB_DIMENSION;
  let yFloor = Math.floor(y / SUB_DIMENSION) * SUB_DIMENSION;
  for (let xi = 0; xi < SUB_DIMENSION; xi++) {
    for (let yi = 0; yi < SUB_DIMENSION; yi++) {
      coords.push({
        x: xFloor + xi,
        y: yFloor + yi,
      });
    }
  }
  return coords;
};
const getOtherCellFunctions: GetOtherCellsFunction[] = [
  getRowCells,
  getColCells,
  getSquareCells,
];

const reducer = (state: BoardState, action: BoardAction): BoardState => {
  // Make a complete deep copy of the board
  const newState = state.map((col) => col.map((c) => ({ ...c })));

  // Use this action to change the appropriate cell
  for (let x = 0; x < DIMENSION; x++) {
    for (let y = 0; y < DIMENSION; y++) {
      if (x === action.x && y === action.y) {
        if (action.fix || !newState[x][y].fixed) {
          if (newState[x][y].value === action.value) {
            newState[x][y].value = EMPTY_CELL;
          } else {
            newState[x][y].value = action.value;
            newState[x][y].fixed = action.fix || false;
          }
        }
      }

      newState[x][y].error = false;
    }
  }

  // Check each cell
  for (let x = 0; x < DIMENSION; x++) {
    for (let y = 0; y < DIMENSION; y++) {
      let allowed = new Set(DIGITS);
      getOtherCellFunctions.forEach((f) => {
        let found: Set<number> = new Set();
        let otherCells = f(x, y);
        otherCells.forEach(({ x: xi, y: yi }) => {
          if (newState[x][y].value !== EMPTY_CELL) {
            if (
              found.has(newState[xi][yi].value) &&
              newState[xi][yi].value !== EMPTY_CELL
            ) {
              otherCells.forEach(({ x: xj, y: yj }) => {
                if (newState[xj][yj].value === newState[xi][yi].value) {
                  newState[xj][yj].error = true;
                }
              });
            }
            found.add(newState[xi][yi].value);
          } else {
            allowed.delete(newState[xi][yi].value);
          }
        });
      });

      //   console.log("Allowed...", { x, y, allowed });
      newState[x][y].allowed = new Set(allowed);
    }
  }

  return newState;
};

const defaultState: BoardState = Array(DIMENSION)
  .fill(null)
  .map((i) =>
    Array(DIMENSION)
      .fill(null)
      .map((j) => ({
        value: EMPTY_CELL,
        error: false,
        fixed: false,
        allowed: new Set(DIGITS),
      }))
  );

const initialActions: BoardAction[] = [
  { x: 0, y: 0, value: 6 },
  { x: 0, y: 1, value: 2 },
  { x: 0, y: 8, value: 1 },
  { x: 1, y: 2, value: 4 },
  { x: 1, y: 3, value: 7 },
  { x: 1, y: 5, value: 1 },
  { x: 1, y: 6, value: 6 },
  { x: 1, y: 7, value: 9 },
  { x: 2, y: 1, value: 1 },
  { x: 2, y: 3, value: 3 },
  { x: 2, y: 4, value: 6 },
  { x: 2, y: 7, value: 8 },
  { x: 3, y: 0, value: 3 },
  { x: 3, y: 3, value: 8 },
  { x: 3, y: 5, value: 6 },
  { x: 3, y: 6, value: 9 },
  { x: 4, y: 3, value: 9 },
  { x: 4, y: 4, value: 4 },
  { x: 4, y: 5, value: 3 },
  { x: 5, y: 2, value: 6 },
  { x: 5, y: 3, value: 1 },
  { x: 5, y: 5, value: 2 },
  { x: 5, y: 8, value: 5 },
  { x: 6, y: 1, value: 9 },
  { x: 6, y: 4, value: 3 },
  { x: 6, y: 5, value: 8 },
  { x: 6, y: 7, value: 1 },
  { x: 7, y: 1, value: 3 },
  { x: 7, y: 2, value: 5 },
  { x: 7, y: 3, value: 6 },
  { x: 7, y: 5, value: 7 },
  { x: 7, y: 6, value: 4 },
  { x: 8, y: 0, value: 1 },
  { x: 8, y: 7, value: 5 },
  { x: 8, y: 8, value: 8 },
];

interface UseSudoku {
  board: BoardState;
  setBoard: BoardActionConsumer;
}

const useSudoku = (): UseSudoku => {
  const [board, setBoard] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    initialActions.map((i) => ({ ...i, fix: true })).forEach(setBoard);
  }, []);

  return { board, setBoard };
};

export default useSudoku;
