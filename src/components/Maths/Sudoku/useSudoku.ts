import React from 'react';

interface Cell {
    value: number,
    error: boolean
}

type BoardState = Cell[][];

interface BoardAction {
    x: number;
    y: number;
    value: number;
}

const reducer = (state: BoardState, action: BoardAction): BoardState => {
    const newState = state.map((col, x) => x === action.x ? col.map((c, y) => y === action.y ? { value: (c.value === action.value) ? EMPTY_CELL : action.value, error: false } : c) : col);

    for (let x = 0; x < DIMENSION; x++) {
        for (let y = 0; y < DIMENSION; y++) {
            newState[x][y].error = false;
        }
    }

    // Check each row
    for (let x = 0; x < DIMENSION; x++) {
        let found: Set<number> = new Set();
        for (let y = 0; y < DIMENSION; y++) {
            if (newState[x][y].value !== EMPTY_CELL && found.has(newState[x][y].value)) {
                for (let yi = 0; yi < DIMENSION; yi++) {
                    if (newState[x][yi].value === newState[x][y].value) {
                        newState[x][yi].error = true;
                    }
                }
            }
            found.add(newState[x][y].value)
        }
    }

    // Check each column
    for (let y = 0; y < DIMENSION; y++) {
        let found: Set<number> = new Set();
        for (let x = 0; x < DIMENSION; x++) {
            if (newState[x][y].value !== EMPTY_CELL && found.has(newState[x][y].value)) {
                for (let xi = 0; xi < DIMENSION; xi++) {
                    if (newState[xi][y].value === newState[x][y].value) {
                        newState[xi][y].error = true;
                    }
                }
            }
            found.add(newState[x][y].value)
        }
    }

    return newState;
}
export const EMPTY_CELL = -1;
export const DIMENSION = 9;

const defaultState: BoardState = Array(DIMENSION)
    .fill(null)
    .map(i =>
        Array(DIMENSION)
            .fill(null)
            .map(j => ({ value: EMPTY_CELL, error: false })));

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
]

interface UseSudoku {
    board: BoardState;
    setBoard: (action: BoardAction) => void;
}

const useSudoku = (): UseSudoku => {
    const [board, setBoard] = React.useReducer(reducer, defaultState);

    React.useEffect(() => {
        initialActions.forEach(setBoard)
    }, [])

    return { board, setBoard }
}

export default useSudoku;