import { HackCpu, NumberBase } from 'comp-sci-maths-lib';
import React from 'react';

interface Props {
    cpu: HackCpu,
    numberBase: NumberBase
}

const RegisterTable: React.FunctionComponent<Props> = ({ numberBase, cpu: {
    namedRegisters } }) => {
    return <table className='cpu-table code-text'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(namedRegisters).map(([name, value]) => (<tr key={name}>
                <td>{name}</td>
                <td>{numberBase.toString(value)}</td>
            </tr>))}
        </tbody>
    </table>
}

export default RegisterTable;