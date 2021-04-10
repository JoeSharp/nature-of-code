import React from "react";
import cogoToast from "cogo-toast";

import { HackCpu, NumberBase } from "comp-sci-maths-lib";

interface UseHackCpuSimulator {
  version: number;
  cpu: HackCpu;
  reset: () => void;
  tick: () => void;
  setRamValue: (address: number, values: number[]) => void;
  loadProgram: (input: string) => void;
}

const useHackCpuSimulator = (numberBase: NumberBase): UseHackCpuSimulator => {
  const [version, incrementVersion] = React.useReducer((a) => a + 1, 0);
  const cpuRef = React.useRef<HackCpu>(new HackCpu());

  const reset = React.useCallback(() => {
    try {
      cpuRef.current.reset();
      incrementVersion();
      cogoToast.info("CPU Reset");
    } catch (e) {
      cogoToast.error(e.message);
    }
  }, [cpuRef]);

  const loadProgram = React.useCallback(
    (input: string) => {
      try {
        cpuRef.current.loadProgram(input);
        incrementVersion();
        cogoToast.info("Program Loaded into CPU ROM");
      } catch (e) {
        cogoToast.error(e.message);
      }
    },
    [cpuRef]
  );

  const tick = React.useCallback(() => {
    try {
      cpuRef.current.tick();
      incrementVersion();
    } catch (e) {
      cogoToast.error(e.message);
    }
  }, [cpuRef]);

  const setRamValue = React.useCallback(
    (address: number, values: number[]) => {
      try {
        cpuRef.current.setMemory(address, values);
        incrementVersion();
        cogoToast.info(
          `Memory Contents from ${numberBase.toString(
            address
          )} set to ${values.map((s) => numberBase.toString(s)).join(", ")}`
        );
      } catch (e) {
        cogoToast.error(e.message);
      }
    },
    [cpuRef, numberBase]
  );

  return {
    version,
    setRamValue,
    cpu: cpuRef.current,
    reset,
    tick,
    loadProgram,
  };
};

export default useHackCpuSimulator;
