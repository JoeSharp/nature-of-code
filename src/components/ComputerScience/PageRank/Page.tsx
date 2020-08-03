import React from "react";

import { Edge } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";
import { UseBuildGraph } from "../GraphBuilder/types";

interface Props {
  page: string;
  buildPages: UseBuildGraph;
}

interface EdgeWithHandler {
  edge: Edge<string>;
  onRemove: () => void;
}

interface EdgesProps {
  getOtherEnd: (edge: Edge<string>) => void;
  edges: EdgeWithHandler[];
}

const Edges: React.FunctionComponent<EdgesProps> = ({ edges, getOtherEnd }) => {
  return (
    <ul>
      {edges.map(({ edge, onRemove }, i) => (
        <li key={i}>
          {getOtherEnd(edge)}{" "}
          <button className="btn btn-danger btn-sm" onClick={onRemove}>
            Remove Edge
          </button>
        </li>
      ))}
    </ul>
  );
};

interface UseEdgesWithHandlers {
  edges: Edge<string>[];
  removeEdge: (from: string, to: string) => void;
  filter: (edge: Edge<string>) => boolean;
}

const useEdgesWithHandlers = ({
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

const GET_EDGE_FROM = (edge: Edge<string>) => edge.from;
const GET_EDGE_TO = (edge: Edge<string>) => edge.to;

const Page: React.FunctionComponent<Props> = ({
  page,
  buildPages: {
    graphBuilder: {
      pendingFrom,
      graph: { edges },
    },
    prepareEdge,
    cancelEdge,
    completeEdge,
    removeVertex,
    removeEdge,
  },
}) => {
  const onPrepareEdge = React.useCallback(() => prepareEdge(page), [
    page,
    prepareEdge,
  ]);
  const onCompleteEdge = React.useCallback(() => completeEdge(page), [
    page,
    completeEdge,
  ]);
  const onCancelEdge = React.useCallback(() => cancelEdge(), [cancelEdge]);
  const onRemovePage = React.useCallback(() => removeVertex(page), [
    page,
    removeVertex,
  ]);

  const filterOutgoing = React.useCallback(
    (edge: Edge<string>) => edge.from === page,
    [page]
  );
  const filterIncoming = React.useCallback(
    (edge: Edge<string>) => edge.to === page,
    [page]
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
    <div className="card">
      <div className="card-header">{page}</div>
      <div className="card-body">
        {outgoingEdges.length > 0 && (
          <React.Fragment>
            <h4>Outgoing</h4>
            <Edges getOtherEnd={GET_EDGE_TO} edges={outgoingEdges} />
          </React.Fragment>
        )}
        {incomingEdges.length > 0 && (
          <React.Fragment>
            <h4>Incoming</h4>
            <Edges getOtherEnd={GET_EDGE_FROM} edges={incomingEdges} />
          </React.Fragment>
        )}
        {outgoingEdges.length === 0 && incomingEdges.length === 0 && (
          <span>No Incoming or Outgoing Edges</span>
        )}
      </div>
      <div className="card-footer">
        {pendingFrom === undefined && (
          <button className="btn btn-sm btn-primary" onClick={onPrepareEdge}>
            Edge From
          </button>
        )}
        {pendingFrom !== undefined && pendingFrom !== page && (
          <button className="btn btn-sm btn-success" onClick={onCompleteEdge}>
            Edge To
          </button>
        )}
        {pendingFrom === page && (
          <button className="btn btn-sm btn-warning" onClick={onCancelEdge}>
            Cancel Edge
          </button>
        )}
        <button className="btn btn-sm btn-danger" onClick={onRemovePage}>
          Remove Page
        </button>
      </div>
    </div>
  );
};

export default Page;
