import cogoToast from "cogo-toast";
import React from "react";
import Button from "src/components/Bootstrap/Buttons/Button";
import ProgramPickerDialog, {
  useDialog as useProgramPicker,
} from "../ProgramManager/ProgramPickerDialog";

interface Props {}

const TestScript: React.FunctionComponent<Props> = () => {
  const [testProgram, setTestProgram] = React.useState<string>("");

  const loadTestScript = React.useCallback(
    (programName, program) => {
      cogoToast.info(`Loading Test Script ${programName}`);
      setTestProgram(program);
    },
    [setTestProgram]
  );

  const {
    showDialog: showProgramPicker,
    componentProps: programPickerProps,
  } = useProgramPicker(loadTestScript);

  return (
    <div>
      <ProgramPickerDialog {...programPickerProps} />
      <h4>
        Test Script
        <Button
          className="title-button"
          text="Load"
          onClick={showProgramPicker}
          styleType="primary"
        />
      </h4>
      <div className="form-group">
        <textarea className="txt-code code-text" value={testProgram} readOnly />
      </div>
    </div>
  );
};

export default TestScript;
