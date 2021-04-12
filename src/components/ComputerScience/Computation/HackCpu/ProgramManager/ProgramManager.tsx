import React from "react";

import NewProgramDialog, {
  useDialog as useNewProgramDialog,
} from "./NewProgramDialog";
import ProgramPickerDialog, {
  useDialog as useProgramPickerDialog,
} from "./ProgramPickerDialog";
import { Props as ButtonProps } from "src/components/Bootstrap/Buttons/Button";
import ButtonBar from "src/components/Bootstrap/Buttons/ButtonBar";
import ProgramEditor from "./ProgramEditor";
import useListReducer from "src/components/lib/useListReducer";
import Tabs, { Tab } from "src/components/Bootstrap/Tabs/Tabs";

interface OpenProgram {
  programName: string;
  program: string;
}

const ProgramManager: React.FunctionComponent = () => {
  const {
    items: openPrograms,
    addItem: addOpenProgram,
    removeItem: removeOpenProgram,
  } = useListReducer<OpenProgram>([]);

  const openProgram = React.useCallback(
    (programName: string, program: string) =>
      addOpenProgram({ programName, program }),
    [addOpenProgram]
  );
  const closeProgram = React.useCallback(
    (programName: string) => {
      removeOpenProgram((p) => p.programName === programName);
    },
    [removeOpenProgram]
  );

  const {
    showDialog: showProgramPicker,
    componentProps: programPickerProps,
  } = useProgramPickerDialog(openProgram);

  const { savedPrograms } = programPickerProps;
  const { createNew: createNewProgram } = savedPrograms;

  const {
    showDialog: showNewProgramDialog,
    componentProps: newProgramProps,
  } = useNewProgramDialog(createNewProgram);

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        onClick: showNewProgramDialog,
        text: "New",
        styleType: "primary",
      },
      {
        onClick: showProgramPicker,
        text: "Open",
        styleType: "success",
      },
    ],
    [showProgramPicker, showNewProgramDialog]
  );

  const tabs: Tab[] = React.useMemo(
    () =>
      openPrograms.map(({ programName, program }) => ({
        title: programName,
        content: (
          <ProgramEditor
            key={programName}
            programName={programName}
            program={program}
            savedPrograms={savedPrograms}
            closeProgram={closeProgram}
          />
        ),
      })),
    [openPrograms, closeProgram, savedPrograms]
  );

  return (
    <div>
      <h4>Program Editor</h4>

      <NewProgramDialog {...newProgramProps} />

      <div>
        <ProgramPickerDialog {...programPickerProps} />
        <ButtonBar buttons={buttons} />
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default ProgramManager;
