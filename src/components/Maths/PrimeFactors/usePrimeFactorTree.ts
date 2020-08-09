import React from "react";
import {
  getPrimeFactors,
  getPrimeFactorTree,
  PrimeFactor,
} from "comp-sci-maths-lib/dist/algorithms/primeNumbers/primeFactors";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

interface UsePrimeFactorTree {
  primeFactors: number[];
  primeFactorTree: Graph<PrimeFactor>;
}

export default (value: number): UsePrimeFactorTree =>
  React.useMemo(() => {
    return {
      primeFactors: getPrimeFactors(value),
      primeFactorTree: getPrimeFactorTree(value),
    };
  }, [value]);
