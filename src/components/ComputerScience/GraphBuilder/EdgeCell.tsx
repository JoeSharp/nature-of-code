import React from "react";

import Graph, { Edge } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

interface Props {
  version: number;
  graph: Graph<string>;
  filter: (edge: Edge<string>) => boolean;
  getOtherEnd: (edge: Edge<string>) => void;
  tickVersion: () => void;
}

const EdgesCell: React.FunctionComponent<Props> = ({
  graph,
  tickVersion,
  filter,
  getOtherEnd,
}) => {
  return (
    <div className="btn-toolbar">
      {graph.edges.filter(filter).map((edge, i) => (
        <span key={i} className="input-group btn-group edge-buttons">
          <div className="input-group-prepend">
            <div className="input-group-text">{getOtherEnd(edge)} </div>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              tickVersion();
              graph.removeEdge(edge.from, edge.to);
            }}
          >
            X
          </button>
        </span>
      ))}
    </div>
  );
};

export default EdgesCell;
