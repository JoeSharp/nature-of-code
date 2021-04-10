import { CpuInstruction, Registers } from 'comp-sci-maths-lib/dist/computation/assemblyLanguage/types';
import { toSymbolicAsm } from 'comp-sci-maths-lib/dist/computation/assemblyLanguage/hackAssembler';
import React from 'react';
import { NumberBase } from 'comp-sci-maths-lib';

interface Props {
    registers: Registers;
    program: CpuInstruction[];
    numberBase: NumberBase;
}

const ProgramMemoryTable: React.FunctionComponent<Props> = ({ registers, program, numberBase }) => {
    return <table className='cpu-table code-text'>
        <thead>
            <tr>
                <th>Line</th>
                <th>Code</th>
            </tr> 
        </thead>
        <tbody>
            {program.map((p, i) => (<tr key={i}>
                <td>{numberBase.toString(i)}</td>
                <td>{toSymbolicAsm(p, registers)}</td>
            </tr>))}
        </tbody>
    </table>
}

export default ProgramMemoryTable;