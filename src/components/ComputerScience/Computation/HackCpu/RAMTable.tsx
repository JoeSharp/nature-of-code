import { NumberBase } from 'comp-sci-maths-lib';
import React from 'react';

interface Props {
    memory: number[];
    numberBase: NumberBase;
}

const RAMTable: React.FunctionComponent<Props> = ({ memory, numberBase }) => {

    return <table className='cpu-table code-text'>
        <thead>
            <tr>
                <th>Address</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {memory.filter((p, i) => i < 30).map((p, i) => (<tr key={i}>
                <td>{numberBase.toString(i)}</td>
                <td>{numberBase.toString(p)}</td>
            </tr>))}
        </tbody>
    </table>
}

export default RAMTable;