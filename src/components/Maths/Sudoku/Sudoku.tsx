import React from 'react';

import useSudoku, { EMPTY_CELL, DIGITS } from './useSudoku';

import './sudoku.css'

interface DigitButton {
    digit: number;
    onClick: () => void;
}

const Sudoku: React.FunctionComponent = () => {
    const [value, setValue] = React.useState<number>(5);
    const { board, setBoard } = useSudoku();

    const buttonProps: DigitButton[] = React.useMemo(() => DIGITS.map(digit => ({
        digit,
        onClick: () => setValue(digit)
    })), [setValue]);

    return (
        <div>
            <div className="btn-group pb-3" role="group" aria-label="Basic example">
                {buttonProps.map(({ digit, onClick }) => {
                    let classNames: string[] = ['btn']
                    if (digit === value) {
                        classNames.push('btn-success')
                    } else {
                        classNames.push('btn-secondary')
                    }

                    return (<button className={classNames.join(' ')} onClick={onClick}>{digit}</button>);
                })}
            </div>

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