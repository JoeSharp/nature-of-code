import React from "react";
import {
  getPrimeFactors,
  getPrimeFactorTree,
  PrimeFactor,
} from "comp-sci-maths-lib/dist/algorithms/primeNumbers/primeFactors";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { BaseDataItem } from "src/components/p5/Boid/types";

export type PrimeFactorDataItem = BaseDataItem<PrimeFactor>;

interface UsePrimeFactorTree {
  primeFactors: number[];
  primeFactorTree: Graph<PrimeFactorDataItem>;
}

const getDataItem = (p: PrimeFactor): PrimeFactorDataItem => ({
  key: p.key.toString(10),
  label: p.value.toString(10),
  value: p,
});

export default (value: number): UsePrimeFactorTree =>
  React.useMemo(() => {
    const primeFactors = getPrimeFactors(value);
    const rawPrimeFactorTree = getPrimeFactorTree(value);

    const primeFactorTree = new Graph<PrimeFactorDataItem>({
      getVertexKey: (d) => d.value.value.toString(10),
    });

    // Convert to data items
    rawPrimeFactorTree.vertices.forEach((v) => {
      const dataItem: PrimeFactorDataItem = getDataItem(v);
      primeFactorTree.addVertex(dataItem);

      rawPrimeFactorTree.getOutgoing(v).forEach((edge) => {
        primeFactorTree.addUnidirectionalEdge(
          dataItem,
          getDataItem(edge.to),
          edge.weight
        );
      });
    });

    return {
      primeFactors,
      primeFactorTree,
    };
  }, [value]);
