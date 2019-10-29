import React from "react";

interface Props {
  noteOn: (note: number, velocity: number) => void;
  noteOff: (note: number) => void;
}

interface UseMidi {
  inputDevices: WebMidi.MIDIInputMap;
  selectedInputDeviceId?: string;
  onInputDeviceSelected: (id: string) => void;
  error: string;
}

const useMidi = ({ noteOn, noteOff }: Props): UseMidi => {
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
          // Mask off the lower nibble (MIDI channel, which we don't care about)
          switch (e.data[0] & 0xf0) {
            case 0x90:
              if (e.data[2] != 0) {
                // if velocity != 0, this is a note-on message
                noteOn(e.data[1], e.data[2]);
                return;
              }
            // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
            case 0x80:
              noteOff(e.data[1]);
              return;
          }
        };
      }

      return () => {
        inputDevice.onmidimessage = undefined;
      };
    }

    return () => {};
  }, [noteOn, noteOff, selectedInputDeviceId, inputDevices]);

  return { inputDevices, error, selectedInputDeviceId, onInputDeviceSelected };
};

export default useMidi;
