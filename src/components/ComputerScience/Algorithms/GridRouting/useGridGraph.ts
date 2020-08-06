import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";
import React from "react";
import p5 from "p5";
import { EqualityCheck, ToString } from "ocr-cs-alevel-ts/dist/types";

interface Props {
  rows: number;
  columns: number;
}

const vectorEqCheck: EqualityCheck<p5.Vector> = (a, b) =>
  a.x === b.x && a.y === b.y;
const vectorToStr: ToString<p5.Vector> = (a) => `${a.x}, ${a.y}`;

export interface UseGridGraph {
  version: number;
  topLeft: p5.Vector;
  bottomRight: p5.Vector;
  graph: Graph<p5.Vector>;
}

export function createVector(x: number, y: number): p5.Vector {
  return p5.Vector.random2D().set(x, y);
}

export default ({ rows, columns }: Props): UseGridGraph => {
  const [version, tickVersion] = React.useReducer((s) => s + 1, 0);

  const graph = React.useRef<Graph<p5.Vector>>(
    new Graph({
      equalityCheck: vectorEqCheck,
      vertexToString: vectorToStr,
    })
  );

  React.useEffect(() => {
    graph.current.clearAll();

    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        if (row > 1) {
          const from: p5.Vector = createVector(col, row);
          const to: p5.Vector = createVector(col, row - 1);
          graph.current.addBiDirectionalEdge(from, to);
        }
        if (row < rows - 1) {
          const from: p5.Vector = createVector(col, row);
          const to: p5.Vector = createVector(col, row + 1);
          graph.current.addBiDirectionalEdge(from, to);
        }
        if (col > 1) {
          const from: p5.Vector = createVector(col, row);
          const to: p5.Vector = createVector(col - 1, row);
          graph.current.addBiDirectionalEdge(from, to);
        }
        if (col < columns - 1) {
          const from: p5.Vector = createVector(col, row);
          const to: p5.Vector = createVector(col + 1, row);
          graph.current.addBiDirectionalEdge(from, to);
        }
      }
    }

    tickVersion();
  }, [rows, columns]);

  return {
    version,
    topLeft: React.useMemo(() => createVector(0, 0), []),
    bottomRight: React.useMemo(() => createVector(columns - 1, rows - 1), [
      rows,
      columns,
    ]),
    graph: graph.current,
  };
};
