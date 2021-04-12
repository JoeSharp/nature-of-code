import React from "react";

import useDirtyState from "src/components/lib/useDirtyState";
import { UseSavedProgram } from "./useSavedProgram";

import { Props as ButtonProps } from "src/components/Bootstrap/Buttons/Button";
import ButtonBar from "src/components/Bootstrap/Buttons/ButtonBar";

const DEFAULT_PROGRAM: string = "// New Program";

interface Props {
  program: string;
  programName: string;
  savedPrograms: UseSavedProgram;
  closeProgram: (name: string) => void;
}

const ProgramEditor: React.FunctionComponent<Props> = ({
  program,
  programName,
  savedPrograms: { saveProgram, deleteProgram },
  closeProgram,
}) => {
  const {
    value: editedProgram,
    setValue: setEditedProgram,
    isDirty: isEditedProgramDirty,
    setClean: setEditedProgramClean,
  } = useDirtyState(DEFAULT_PROGRAM);

  const onEditedProgramChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback(
    ({ target: { value } }) => setEditedProgram(value),
    [setEditedProgram]
  );

  React.useEffect(() => {
    setEditedProgram(program);
    setEditedProgramClean();
  }, [program, setEditedProgramClean, setEditedProgram]);

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        onClick: () => {
          saveProgram(programName, editedProgram);
          setEditedProgramClean();
        },
        text: "Save",
        styleType: "success",
      },
      {
        onClick: () => {
          deleteProgram(programName);
          closeProgram(programName);
        },
        text: "Delete",
        styleType: "danger",
      },
      {
        onClick: () => closeProgram(programName),
        text: "Close",
        styleType: "warning",
      },
    ],
    [
      editedProgram,
      programName,
      setEditedProgramClean,
      closeProgram,
      deleteProgram,
      saveProgram,
    ]
  );

  return (
    <div>
      <h4>
        {programName} {isEditedProgramDirty ? "*" : ""}
      </h4>
      <ButtonBar buttons={buttons} />
      <div className="form-group">
        <label>Program Content</label>
        <textarea
          className="txt-code code-text"
          value={editedProgram}
          onChange={onEditedProgramChange}
        />
      </div>
    </div>
  );
};

export default ProgramEditor;
