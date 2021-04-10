import React from 'react';
import cogoToast from "cogo-toast";

import { HackCpu } from 'comp-sci-maths-lib';

interface UseHackCpuSimulator {
    version: number,
    cpu: HackCpu,
    reset: () => void;
    tick: () => void;
    setRamValue: (address: number, values: number[]) => void;
    loadProgram: (input: string) => void;
}

const useHackCpuSimulator = (): UseHackCpuSimulator => {
    const [version, incrementVersion] = React.useReducer(a => a + 1, 0);
    const cpuRef = React.useRef<HackCpu>(new HackCpu());

    const reset = React.useCallback(() => {
        try {
            cpuRef.current.reset();
            incrementVersion();
        } catch (e) {
            cogoToast.error(e.message);
        }
    }, [cpuRef]);

    const loadProgram = React.useCallback((input: string) => {
        try {
            cpuRef.current.loadProgram(input);
            incrementVersion();
        } catch (e) {
            cogoToast.error(e.message);
        }
    }, [cpuRef]);

    const tick = React.useCallback(() => {
        try {
            cpuRef.current.tick()
            incrementVersion();
        } catch (e) {
            cogoToast.error(e.message);
        }
    }, [cpuRef]);

    const setRamValue = React.useCallback((address: number, values: number[]) => {
        try {
            cpuRef.current.setMemory(address, values);
            incrementVersion();
        } catch (e) {
            cogoToast.error(e.message);
        }
    }, [cpuRef])

    return {
        version,
        setRamValue,
        cpu: cpuRef.current,
        reset,
        tick,
        loadProgram
    }
}

export default useHackCpuSimulator;