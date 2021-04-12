import React from "react";
import ModalDialog from "src/components/Bootstrap/ModalDialog";
import { Props as ButtonProps } from "src/components/Bootstrap/Buttons/Button";
import ButtonBar from "src/components/Bootstrap/Buttons/ButtonBar";
import useSavedProgram, { UseSavedProgram } from "./useSavedProgram";

interface Props {
  selectedProgram: string;
  savedPrograms: UseSavedProgram;
  onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ProgramPickerDialog: React.FunctionComponent<Props> = (props) => {
  const {
    savedPrograms: { names },
    selectedProgram,
    onSelectChange,
    onConfirm,
    onCancel,
  } = props;

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        text: "Load",
        styleType: "primary",
        onClick: onConfirm,
      },
      {
        text: "Cancel",
        styleType: "danger",
        onClick: onCancel,
      },
    ],
    [onConfirm, onCancel]
  );

  return (
    <ModalDialog
      {...props}
      header={<h4>Select Address to Display</h4>}
      content={
        <div className="form-group">
          <label>Program</label>
          <select
            className="form-control"
            value={selectedProgram}
            onChange={onSelectChange}
          >
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      }
      actions={<ButtonBar buttons={buttons} />}
    />
  );
};

interface UseDialog {
  showDialog: () => void;
  componentProps: Props;
}

export const useDialog = (
  onConfirm: (programName: string, program: string) => void
): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const savedPrograms = useSavedProgram();

  const { names, programs } = savedPrograms;

  const [selectedProgram, setProgramName] = React.useState<string>(names[0]);

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => {
      setProgramName(value);
    },
    [setProgramName]
  );

  const onCancel = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const showDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);
  const _onConfirm = React.useCallback(() => {
    onConfirm(selectedProgram, programs[selectedProgram]);
    onCancel();
  }, [selectedProgram, programs, onConfirm, onCancel]);

  return {
    showDialog,
    componentProps: {
      isOpen,
      onSelectChange,
      savedPrograms,
      selectedProgram,
      onConfirm: _onConfirm,
      onCancel,
    },
  };
};

export default ProgramPickerDialog;
