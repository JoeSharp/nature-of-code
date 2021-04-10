import React from "react";

import HackAsmProgramPicker, {
  usePicker as useHackAsmProgramPicker,
} from "./HackAsmProgramPicker";
import NewHackAsmProgramDialog, {
  useDialog as useNewProgramDialog,
} from "./NewHackAsmProgramDialog";
import { Props as ButtonProps } from "src/components/Bootstrap/Buttons/Button";
import useDirtyState from "src/components/lib/useDirtyState";
import ButtonBar from "src/components/Bootstrap/Buttons/ButtonBar";

const DEFAULT_PROGRAM: string = "// New Program";

interface Props {
  loadProgram: (program: string) => void;
}

const HackAsmProgramManager: React.FunctionComponent<Props> = ({
  loadProgram,
}) => {
  const {
    value: editedProgram,
    setValue: setEditedProgram,
    isDirty: isEditedProgramDirty,
    setClean: setEditedProgramClean,
  } = useDirtyState(DEFAULT_PROGRAM);

  const {
    program,
    programName,
    savedPrograms: {
      createNew: createNewProgram,
      save: saveProgram,
      deleteProgram,
    },
    componentProps: programPickerProps,
  } = useHackAsmProgramPicker();
  React.useEffect(() => {
    setEditedProgram(program);
    setEditedProgramClean();
  }, [program, setEditedProgramClean, setEditedProgram]);

  const onEditedProgramChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback(
    ({ target: { value } }) => setEditedProgram(value),
    [setEditedProgram]
  );

  const {
    showDialog: showNewProgramDialog,
    componentProps: newProgramProps,
  } = useNewProgramDialog(createNewProgram);

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        onClick: showNewProgramDialog,
        text: "Create New",
        styleType: "primary",
      },
      {
        onClick: () => {
          saveProgram(programName, editedProgram);
          setEditedProgramClean();
        },
        text: "Save",
        styleType: "success",
      },
      {
        onClick: () => loadProgram(editedProgram),
        styleType: "warning",
        text: "Load",
      },
      {
        onClick: () => deleteProgram(programName),
        text: "Delete",
        styleType: "danger",
      },
    ],
    [
      programName,
      saveProgram,
      loadProgram,
      editedProgram,
      deleteProgram,
      setEditedProgramClean,
      showNewProgramDialog,
    ]
  );

  return (
    <div className="hack-cpu-controls">
      <h4>Program Editor {isEditedProgramDirty ? "*" : ""}</h4>

      <NewHackAsmProgramDialog {...newProgramProps} />

      <div>
        <HackAsmProgramPicker {...programPickerProps} />
        <ButtonBar buttons={buttons} />
      </div>

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

export default HackAsmProgramManager;
