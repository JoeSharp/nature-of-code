import React from "react";
import cogoToast from "cogo-toast";

import useLocalStorage, {
  useStoreObjectFactory,
} from "src/components/lib/useLocalStorage";

import { programs as defaultPrograms } from "./cannedPrograms";
import { ProgramsById } from "./types";

export interface UseSavedProgram {
  names: string[];
  programs: ProgramsById;
  createNew(name: string): void;
  deleteProgram(name: string): void;
  saveProgram(name: string, program: string): void;
  reset: () => void;
}

export default (): UseSavedProgram => {
  const {
    value: programs,
    reduceValue: reducePrograms,
    setValue: setPrograms,
  } = useLocalStorage<ProgramsById>(
    "saved-programs",
    defaultPrograms,
    useStoreObjectFactory()
  );

  const names: string[] = React.useMemo(() => Object.keys(programs), [
    programs,
  ]);

  const createNew = React.useCallback(
    (name: string) => {
      if (name.length < 3) {
        cogoToast.error("Could not save graph with short name (length < 3)");
      } else if (names.includes(name)) {
        cogoToast.error("This name already exists");
      } else {
        reducePrograms((existing: ProgramsById) => ({
          ...existing,
          [name]: "// New Program",
        }));
        cogoToast.info(`New Program Created ${name}`);
      }
    },
    [reducePrograms, names]
  );

  const saveProgram = React.useCallback(
    (name: string, program: string) => {
      reducePrograms((existing: ProgramsById) => ({
        ...existing,
        [name]: program,
      }));
      cogoToast.info(`Program Saved ${name}`);
    },
    [reducePrograms]
  );

  const deleteProgram = React.useCallback(
    (name: string) => {
      reducePrograms((existing: ProgramsById) => {
        const updated = { ...existing };
        delete updated[name];
        return updated;
      });
      cogoToast.info(`Program Deleted ${name}`);
    },
    [reducePrograms]
  );

  const reset = React.useCallback(() => {
    setPrograms(defaultPrograms);
  }, [setPrograms]);

  return {
    names,
    programs,
    createNew,
    deleteProgram,
    saveProgram,
    reset,
  };
};
