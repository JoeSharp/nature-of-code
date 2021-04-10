import React from 'react';

import Button from 'src/components/Bootstrap/Buttons/Button';
import ProgramMemoryTable from './ProgramMemoryTable';
import RAMTable from './RAMTable';
import RegisterTable from './RegisterTable';
import useHackCpuSimulator from './useHackCpuSimulator';
import NumberBasePicker, { usePicker as useNumberBasePicker } from './NumberBasePicker';
import SetRamValueModal, { useSetRamValueModal } from './SetRamValueModal';
import HackAsmProgramPicker, { usePicker as useHackAsmProgramPicker } from './HackAsmProgramPicker';
import NewHackAsmProgramDialog, { useDialog as useNewProgramDialog } from './NewHackAsmProgramDialog';

import './cpuSimulator.css'

import CPUTable from './CPUTable';
import StepForwardControls, { useStepForwardControls } from 'src/components/lib/StepForwardControls';
import useDirtyState from 'src/components/lib/useDirtyState';

const DEFAULT_PROGRAM: string = '// New Program'

const HackCpuSimulator: React.FunctionComponent = () => {
    const {
        value: editedProgram,
        setValue: setEditedProgram,
        isDirty: isEditedProgramDirty,
        setClean: setEditedProgramClean
    } = useDirtyState(DEFAULT_PROGRAM);

    const { version, cpu, setRamValue, loadProgram, reset, tick } = useHackCpuSimulator();

    const onEditedProgramChange: React.ChangeEventHandler<HTMLTextAreaElement> =
        React.useCallback(({ target: { value } }) => setEditedProgram(value), [setEditedProgram]);

    const onLoadProgram = React.useCallback(() => loadProgram(editedProgram), [editedProgram, loadProgram]);

    const { numberBase, componentProps } = useNumberBasePicker('form-control');

    const { componentProps: setRamValueProps, showDialog: showSetRamValueDialog } = useSetRamValueModal({
        onConfirm: React.useCallback((address: number, values: number[]) => {
            setRamValue(address, values);
        }, [setRamValue])
    });

    React.useEffect(() => setRamValue(0, [56, 7]), [setRamValue]);

    const { componentProps: stepForwardProps } = useStepForwardControls({ reset, iterate: tick });

    const { program, programName, savedPrograms: { createNew: createNewProgram, save: saveProgram, deleteProgram }, componentProps: programPickerProps } = useHackAsmProgramPicker();
    React.useEffect(() => {
        setEditedProgram(program);
        setEditedProgramClean();
    }, [program, setEditedProgramClean, setEditedProgram]);

    const onSaveProgram = React.useCallback(() => {
        saveProgram(programName, editedProgram);
        setEditedProgramClean();
    }, [editedProgram, programName, saveProgram, setEditedProgramClean]);

    const onDeleteProgram = React.useCallback(() => {
        deleteProgram(programName);
    }, [programName, deleteProgram])

    const { showDialog: showNewProgramDialog, componentProps: newProgramProps } = useNewProgramDialog(createNewProgram);

    return <div>
        <SetRamValueModal {...setRamValueProps} />
        <NewHackAsmProgramDialog {...newProgramProps} />

        <div className='hack-cpu-controls'>
            <StepForwardControls {...stepForwardProps} />

            <div>
                <HackAsmProgramPicker {...programPickerProps} />
                <Button onClick={showNewProgramDialog} text='Create New' styleType='primary' />
                <Button onClick={onSaveProgram} text='Save' styleType='success' />
                <Button onClick={onDeleteProgram} text='Delete' styleType='danger' />
            </div>

            <div className='form-group'>
                <label>Number Base</label>
                <NumberBasePicker {...componentProps} />
            </div>

        </div>

        <div className='cpu-contents'>
            <div>
                <h4>Program {isEditedProgramDirty ? '*' : ''}
                    <Button
                        className='title-button'
                        onClick={onLoadProgram}
                        styleType='warning'
                        text='Load' />
                </h4>
                <textarea className='txt-code code-text' value={editedProgram} onChange={onEditedProgramChange} />
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