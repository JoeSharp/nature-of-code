import React from 'react';

import useSudoku, { EMPTY_CELL, DIMENSION } from './useSudoku';

import './sudoku.css'

const Sudoku: React.FunctionComponent = () => {
    const [value, setValue] = React.useState<number>(5);
    const { board, setBoard } = useSudoku();

    const onValueChange: React.ChangeEventHandler<HTMLInputElement> =
        React.useCallback(({ target: { value } }) => setValue(parseInt(value)), [setValue]);

    return (
        <div>
            <form>
                <div className='form-group'>
                    <input className='form-control' min={EMPTY_CELL} max={DIMENSION} type='number' value={value} onChange={onValueChange} />
                </div>
            </form>
            <table className='sudoku-table'>
                <thead></thead>
                <tbody>
                    {board.map((row, x) => <tr key={x}>
                        {row.map((cell, y) => <td key={y} className={cell.error ? 'sudoku-cell sudoku-cell-error' : 'sudoku-cell'} onClick={() => setBoard({ x, y, value })}>
                            {cell.value === EMPTY_CELL ? '' : cell.value}
                        </td>)}
                    </tr>)}

                </tbody>
            </table>
        </div>)
}

export default Sudoku;