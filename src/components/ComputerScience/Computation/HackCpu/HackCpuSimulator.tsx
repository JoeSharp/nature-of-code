import React from 'react';

import Button from 'src/components/Bootstrap/Buttons/Button';
import ProgramMemoryTable from './ProgramMemoryTable';
import RAMTable from './RAMTable';
import RegisterTable from './RegisterTable';
import useHackCpuSimulator from './useHackCpuSimulator';
import NumberBasePicker, { usePicker as useNumberBasePicker } from './NumberBasePicker';
import SetRamValueModal, { useSetRamValueModal } from './SetRamValueModal';

import './cpuSimulator.css'

import maxCalculator from './cannedPrograms/Max';
import CPUTable from './CPUTable';
import StepForwardControls, { useStepForwardControls } from 'src/components/lib/StepForwardControls';

const HackCpuSimulator: React.FunctionComponent = () => {
    const [program, setProgram] = React.useState<string>('');

    const { version, cpu, setRamValue, loadProgram, reset, tick } = useHackCpuSimulator();

    const onProgramChange: React.ChangeEventHandler<HTMLTextAreaElement> =
        React.useCallback(({ target: { value } }) => setProgram(value), [setProgram]);

    const onLoadProgram = React.useCallback(() => loadProgram(program), [program, loadProgram]);

    const { numberBase, componentProps } = useNumberBasePicker('form-control');

    const { componentProps: setRamValueProps, showDialog: showSetRamValueDialog } = useSetRamValueModal({
        onConfirm: React.useCallback((address: number, values: number[]) => {
            setRamValue(address, values);
        }, [setRamValue])
    });

    React.useEffect(() => setRamValue(0, [56, 7]), [setRamValue]);
    React.useEffect(() => {
        setProgram(maxCalculator);
        loadProgram(maxCalculator)
    }, [loadProgram]);

    const { componentProps: stepForwardProps } = useStepForwardControls({ reset, iterate: tick });

    return <div><SetRamValueModal {...setRamValueProps} />

        <StepForwardControls {...stepForwardProps} />
        <div className='form-group'>
            <label>Number Base</label>
            <NumberBasePicker {...componentProps} />
        </div>

        <div className='cpu-contents'>
            <div>
                <h4>Program
                    <Button
                        className='title-button'
                        onClick={onLoadProgram}
                        styleType='warning'
                        text='Load' />
                </h4>
                <textarea className='txt-code code-text' value={program} onChange={onProgramChange} />
            </div>

            <div>
                <h4>Loaded Program</h4>
                <ProgramMemoryTable program={cpu.program} registers={cpu.namedRegisters} numberBase={numberBase} />
            </div>
            <div>
                <h4>RAM
                    <Button
                        className='title-button'
                        onClick={showSetRamValueDialog}
                        styleType='primary'
                        text='Set Value(s)' />
                </h4>
                <RAMTable memory={cpu.memory} numberBase={numberBase} />
            </div>
            <div>
                <h4>CPU</h4>
                <CPUTable cpu={cpu} numberBase={numberBase} />
                <h4>Registers</h4>
                <RegisterTable cpu={cpu} numberBase={numberBase} />
            </div>
        </div>
        {version}
    </div>
}

export default HackCpuSimulator;