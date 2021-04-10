import { HackCpu, NumberBase } from 'comp-sci-maths-lib';
import React from 'react';

interface Props {
    cpu: HackCpu,
    numberBase: NumberBase
}

const CPUTable: React.FunctionComponent<Props> = ({ cpu: {
    programCounter,
    addressRegister, 
    dataRegister } }) => {
    return <table className='cpu-table code-text'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Program Counter (PC)</td>
                <td>{programCounter}</td>
            </tr>
            <tr>
                <td>Address (A)</td>
                <td>{addressRegister}</td>
            </tr>
            <tr>
                <td>Data (D)</td>
                <td>{dataRegister}</td>
            </tr>
        </tbody>
    </table>
}

export default CPUTable;