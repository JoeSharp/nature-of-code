import React from "react";

import { Edge } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

interface EdgeWithHandler {
  edge: Edge<string>;
  onRemove: () => void;
}

interface EdgesProps {
  getOtherEnd: (edge: Edge<string>) => void;
  edges: EdgeWithHandler[];
}

const EdgesCell: React.FunctionComponent<EdgesProps> = ({
  edges,
  getOtherEnd,
}) => {
  return (
    <div className="btn-toolbar mb-3">
      {edges.map(({ edge, onRemove }, i) => (
        <span key={i} className="input-group btn-group">
          <div className="input-group-prepend">
            <div className="input-group-text">{getOtherEnd(edge)} </div>
          </div>
          <button className="btn btn-danger btn-sm" onClick={onRemove}>
            Remove
          </button>
        </span>
      ))}
    </div>
  );
};

interface UseEdgesWithHandlers {
  edges: Edge<string>[];
  removeEdge: (from: string, to: string) => void;
  filter: (edge: Edge<string>) => boolean;
}

export const useEdgesWithHandlers = ({
  edges,
  removeEdge,
  filter,
}: UseEdgesWithHandlers) =>
  React.useMemo(
    () =>
      edges.filter(filter).map((edge) => ({
        edge,
        onRemove: () => removeEdge(edge.from, edge.to),
      })),
    [filter, edges, removeEdge]
  );
export default EdgesCell;
