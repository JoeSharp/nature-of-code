import React from "react";
import cogoToast from "cogo-toast";

import { HackCpuTestRunner } from "comp-sci-maths-lib";
import useSavedPrograms from "src/components/lib/useSavedPrograms";
import { LoadProgram } from "./types";

interface UseHackCpuTestRunner {
  version: number;
  cpuTestRunner: HackCpuTestRunner;
  loadProgram: LoadProgram;
}

const useHackCpuTestRunner = (): UseHackCpuTestRunner => {
  const { programs } = useSavedPrograms();

  const [version, incrementVersion] = React.useReducer((a) => a + 1, 0);
  const cpuTestRunnerRef = React.useRef<HackCpuTestRunner>(
    new HackCpuTestRunner((d) => programs[d])
  );

  const loadProgram = React.useCallback(
    (programName: string, program: string) => {
      try {
        cpuTestRunnerRef.current.loadScript(program);
        incrementVersion();
        cogoToast.info(`Test Script Loaded ${programName}`);
      } catch (e) {
        cogoToast.error(e.message);
      }
    },
    [cpuTestRunnerRef]
  );

  return {
    version,
    cpuTestRunner: cpuTestRunnerRef.current,
    loadProgram,
  };
};

export default useHackCpuTestRunner;
