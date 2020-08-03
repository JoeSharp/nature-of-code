import React from "react";

import { Edge } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";
import { UseBuildGraph } from "./types";
import EdgesCell, { useEdgesWithHandlers } from "./EdgeCell";

interface Props {
  vertex: string;
  buildGraph: UseBuildGraph;
}

const GET_EDGE_FROM = (edge: Edge<string>) => edge.from;
const GET_EDGE_TO = (edge: Edge<string>) => edge.to;

const VertexRow: React.FunctionComponent<Props> = ({
  vertex,
  buildGraph: {
    graphBuilder: {
      pendingFrom,
      graphData: { edges },
    },
    prepareEdge,
    cancelEdge,
    completeEdge,
    removeVertex,
    removeEdge,
  },
}) => {
  const onPrepareEdge = React.useCallback(() => prepareEdge(vertex), [
    vertex,
    prepareEdge,
  ]);
  const onCompleteEdge = React.useCallback(() => completeEdge(vertex), [
    vertex,
    completeEdge,
  ]);
  const onCancelEdge = React.useCallback(() => cancelEdge(), [cancelEdge]);
  const onRemoveVertex = React.useCallback(() => removeVertex(vertex), [
    vertex,
    removeVertex,
  ]);

  const filterOutgoing = React.useCallback(
    (edge: Edge<string>) => edge.from === vertex,
    [vertex]
  );
  const filterIncoming = React.useCallback(
    (edge: Edge<string>) => edge.to === vertex,
    [vertex]
  );
  const outgoingEdges = useEdgesWithHandlers({
    edges,
    removeEdge,
    filter: filterOutgoing,
  });
  const incomingEdges = useEdgesWithHandlers({
    edges,
    removeEdge,
    filter: filterIncoming,
  });

  return (
    <tr>
      <td>{vertex}</td>
      <td>
        {outgoingEdges.length > 0 ? (
          <EdgesCell getOtherEnd={GET_EDGE_TO} edges={outgoingEdges} />
        ) : (
          "None"
        )}
      </td>
      <td>
        {incomingEdges.length > 0 ? (
          <EdgesCell getOtherEnd={GET_EDGE_FROM} edges={incomingEdges} />
        ) : (
          "None"
        )}
      </td>
      <td>
        <div className="btn-group">
          {pendingFrom === undefined && (
            <button className="btn btn-sm btn-primary" onClick={onPrepareEdge}>
              Edge From
            </button>
          )}
          {pendingFrom !== undefined && pendingFrom !== vertex && (
            <button className="btn btn-sm btn-success" onClick={onCompleteEdge}>
              Edge To
            </button>
          )}
          {pendingFrom === vertex && (
            <button className="btn btn-sm btn-warning" onClick={onCancelEdge}>
              Cancel
            </button>
          )}
          <button className="btn btn-sm btn-danger" onClick={onRemoveVertex}>
            Remove Vertex
          </button>
        </div>
      </td>
    </tr>
  );
};

export default VertexRow;
