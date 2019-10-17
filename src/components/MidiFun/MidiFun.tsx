import React from "react";
import Select from "react-select";

import useMidi, { MidiMessage, MidiMessageEventHandler } from "./useMidi";

const MidiFun: React.FunctionComponent = () => {
  const midiMessageHandler: MidiMessageEventHandler = React.useCallback(
    (e: MidiMessage) => {
      console.log("Midi Message", e);
    },
    []
  );

  const {
    inputDevices,
    error,
    selectedInputDeviceId,
    onInputDeviceSelected
  } = useMidi(midiMessageHandler);

  const inputOptions = React.useMemo(() => {
    const options = [];

    for (let [key, value] of inputDevices.entries()) {
      options.push({ value: key, label: value.name });
    }

    return options;
  }, [inputDevices]);

  const selectedValue = React.useMemo(
    () =>
      inputOptions.find(
        inputOption => inputOption.value === selectedInputDeviceId
      ),
    [selectedInputDeviceId, inputOptions]
  );
  const onSelectedInputChange = React.useCallback(
    e => {
      if (!!e.value) {
        onInputDeviceSelected(e.value);
      }
    },
    [onInputDeviceSelected]
  );

  return (
    <div>
      <h2>MIDI Fun</h2>
      <p>{error}</p>

      <Select
        value={selectedValue}
        onChange={onSelectedInputChange}
        options={inputOptions}
      />
    </div>
  );
};

export default MidiFun;
