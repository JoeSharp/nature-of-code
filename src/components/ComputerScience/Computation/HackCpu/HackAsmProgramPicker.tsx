import React from 'react';
import useSavedHackAsmProgram, { UseSavedHackAsmProgram } from './useSavedHackAsmProgram';

interface Props {
    names: string[];
    value: string;
    onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const HackAsmProgramPicker: React.FunctionComponent<Props> = ({ names, value, onSelectChange }) => {
    return <div className="form-group">
        <label>Program</label>
        <select className="form-control" value={value} onChange={onSelectChange}>
            {names.map((name) => (
                <option key={name} value={name}>
                    {name}
                </option>
            ))}
        </select>
    </div>
}

interface UsePicker {
    program: string;
    programName: string;
    savedPrograms: UseSavedHackAsmProgram;
    componentProps: Props;
}

export const usePicker = (): UsePicker => {
    const savedPrograms = useSavedHackAsmProgram();

    const { names, programs, createNew } = savedPrograms;

    const [programName, setProgramName] = React.useState<string>(names[0]);

    const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
        ({ target: { value } }) => {
            setProgramName(value);
        },
        [setProgramName]
    );

    const _createNew = React.useCallback((name: string) => {
        createNew(name);
        setProgramName(name);
    }, [createNew]);

    return {
        program: programs[programName],
        programName,
        savedPrograms: {
            ...savedPrograms,
            createNew: _createNew,
        },
        componentProps: {
            names,
            value: programName,
            onSelectChange
        }
    }
}

export default HackAsmProgramPicker;