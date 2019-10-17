import React from "react";

export interface MidiMessage {
  command: number;
  note: number;
  velocity: number;
}

export type MidiMessageEventHandler = (e: MidiMessage) => void;

interface UseMidi {
  inputDevices: WebMidi.MIDIInputMap;
  selectedInputDeviceId?: string;
  onInputDeviceSelected: (id: string) => void;
  error: string;
}

const useMidi = (handler: MidiMessageEventHandler): UseMidi => {
  const [inputDevices, setInputDevices] = React.useState(new Map());
  const [error, setError] = React.useState<string>("init");
  const [selectedInputDeviceId, onInputDeviceSelected] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    if (navigator.requestMIDIAccess) {
      setError("This browser supports WebMIDI!");
    } else {
      setError("WebMIDI is not supported in this browser.");
    }

    const onMIDISuccess = (midiAccess: WebMidi.MIDIAccess) => {
      setInputDevices(midiAccess.inputs);
    };

    const onMIDIFailure = () => {
      setError("Could not access your M");
    };

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }, [setInputDevices, setError]);

  React.useEffect(() => {
    if (!!selectedInputDeviceId) {
      const inputDevice = inputDevices.get(selectedInputDeviceId);
      if (!!inputDevice) {
        inputDevice.onmidimessage = (e: WebMidi.MIDIMessageEvent) => {
          if (e.data[0] != 254) {
            // filter out keepalive
            handler({
              command: e.data[0],
              note: e.data[1],
              velocity: e.data.length > 2 ? e.data[2] : 0
            });
          }
        };
      }

      return () => {
        inputDevice.onmidimessage = undefined;
      };
    }

    return () => {};
  }, [handler, selectedInputDeviceId, inputDevices]);

  return { inputDevices, error, selectedInputDeviceId, onInputDeviceSelected };
};

export default useMidi;
