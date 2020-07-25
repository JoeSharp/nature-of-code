import React from "react";

import { cloneDeep } from "lodash";

import sieveOfEratosthenes, {
  getPrimeNumbers,
  PrimeCallbackArgs,
  PrimeCallback,
} from "ocr-cs-alevel-ts/dist/algorithms/primeNumbers/sieveOfEratosthenes";
import useLoopCounter from "../../lib/useLoopCounter";

interface Props {
  limit: number;
}

interface Iteration extends PrimeCallbackArgs {
  primeNumbers: number[];
}

interface UseSieveOfEratosthenes {
  index: number;
  iteration: Iteration;
  primeNumbers: number[];
  stepForward: () => void;
  stepBackward: () => void;
}

const useSieveOfEratosthenes = ({ limit }: Props): UseSieveOfEratosthenes => {
  const { iterations, primeNumbers } = React.useMemo(() => {
    const iterations: Iteration[] = [];
    const callback: PrimeCallback = (args) =>
      iterations.push({
        ...cloneDeep(args),
        primeNumbers: getPrimeNumbers(args.markedNumbers),
      });

    const primeNumbers: number[] = sieveOfEratosthenes(limit, callback);

    return {
      iterations,
      primeNumbers,
    };
  }, [limit]);

  const { count, decrement, increment } = useLoopCounter({
    max: iterations.length - 1,
  });

  const iteration = React.useMemo(() => iterations[count], [iterations, count]);

  return {
    index: count,
    iteration,
    primeNumbers,
    stepForward: React.useCallback(() => increment(1), [increment]),
    stepBackward: React.useCallback(() => decrement(1), [decrement]),
  };
};

export default useSieveOfEratosthenes;
