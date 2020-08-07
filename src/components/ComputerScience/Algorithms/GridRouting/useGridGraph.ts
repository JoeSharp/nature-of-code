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
  connect: (vertex: p5.Vector) => void;
  disconnect: (vertex: p5.Vector) => void;
  toggleConnection: (vertex: p5.Vector) => void;
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

  const connect = React.useCallback(
    (vertex: p5.Vector) => {
      if (vertex.y > 1) {
        const to: p5.Vector = createVector(vertex.x, vertex.y - 1);
        graph.current.addBiDirectionalEdge(vertex, to);
      }
      if (vertex.y < rows - 1) {
        const to: p5.Vector = createVector(vertex.x, vertex.y + 1);
        graph.current.addBiDirectionalEdge(vertex, to);
      }
      if (vertex.x > 1) {
        const to: p5.Vector = createVector(vertex.x - 1, vertex.y);
        graph.current.addBiDirectionalEdge(vertex, to);
      }
      if (vertex.x < columns - 1) {
        const to: p5.Vector = createVector(vertex.x + 1, vertex.y);
        graph.current.addBiDirectionalEdge(vertex, to);
      }
      tickVersion();
    },
    [rows, columns, graph, tickVersion]
  );
  const disconnect = React.useCallback(
    (vertex: p5.Vector) => {
      graph.current.removeVertex(vertex);
      graph.current.addVertex(vertex);

      tickVersion();
    },
    [graph]
  );

  const toggleConnection = React.useCallback(
    (vertex: p5.Vector) => {
      if (
        graph.current.getIncoming(vertex).length > 0 ||
        graph.current.getOutgoing(vertex).length > 0
      ) {
        disconnect(vertex);
      } else {
        connect(vertex);
      }
    },
    [graph, disconnect, connect]
  );

  React.useEffect(() => {
    graph.current.clearAll();

    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        graph.current.addVertex(createVector(col, row));
      }
    }

    graph.current.vertices.forEach((v) => connect(v));
    disconnect(createVector(0, 7));
    disconnect(createVector(1, 6));
    disconnect(createVector(2, 5));
    disconnect(createVector(3, 4));
    disconnect(createVector(4, 3));
    disconnect(createVector(4, 4));
    disconnect(createVector(4, 5));

    disconnect(createVector(8, 1));
    disconnect(createVector(8, 2));
    disconnect(createVector(8, 3));
    disconnect(createVector(8, 4));

    disconnect(createVector(9, 4));
    disconnect(createVector(9, 7));
    disconnect(createVector(10, 3));
    disconnect(createVector(11, 1));
    disconnect(createVector(11, 6));
    disconnect(createVector(11, 7));

    disconnect(createVector(12, 1));
    disconnect(createVector(12, 4));
    disconnect(createVector(12, 5));

    tickVersion();
  }, [rows, columns, connect, disconnect]);

  return {
    version,
    topLeft: React.useMemo(() => createVector(0, 0), []),
    bottomRight: React.useMemo(() => createVector(columns - 1, rows - 1), [
      rows,
      columns,
    ]),
    graph: graph.current,
    connect,
    disconnect,
    toggleConnection,
  };
};
