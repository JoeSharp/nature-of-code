import React from "react";
import VertexRow from "./VertexRow";
import useSketch from "src/components/p5/useSketch";
import GraphSketch from "src/components/ComputerScience/GraphBuilder/GraphSketch";
import { UseBuildGraph } from "./types";
import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

import "./graphBuilder.css";
import { BoidDraw } from "src/components/p5/Boid/types";
import DataItemBoid, {
  defaultDataItemDraw,
} from "src/components/p5/Boid/DataItemBoid";

interface Props {
  buildGraph: UseBuildGraph;
  drawBoid: BoidDraw<string, DataItemBoid>;
}

const GraphBuilder: React.FunctionComponent<Props> = ({
  buildGraph,
  drawBoid,
}) => {
  const { graph, clearAll } = buildGraph;
  const [newVertexName, setNewVertexName] = React.useState<string>("Z");
  const onAddVertex = React.useCallback(() => {
    if (newVertexName.length > 0) {
      graph.addVertex(newVertexName);
    }
  }, [newVertexName, graph]);
  const onNewVertexChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewVertexName(value),
    [setNewVertexName]
  );

  const [physicsEnabled, setPhysicsEnabled] = React.useState<boolean>(true);
  const onPhysicsEnabledChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { checked } }) => setPhysicsEnabled(checked),
    [setPhysicsEnabled]
  );

  const { refContainer, updateConfig } = useSketch(GraphSketch);

  React.useEffect(() => updateConfig({ graph, physicsEnabled }), [
    physicsEnabled,
    graph,
    updateConfig,
    drawBoid,
  ]);

  return (
    <div>
      <h2>Build Graph (v{graph.version})</h2>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={physicsEnabled}
          onChange={onPhysicsEnabledChange}
          id="chkPhysicsEnabled"
        />
        <label className="form-check-label" htmlFor="chkPhysicsEnabled">
          Physics Enabled
        </label>
      </div>
      <div className="sketch" ref={refContainer} />
      <form>
        <div className="form-group">
          <label htmlFor="newVertexName">New Vertex Name</label>
          <input
            id="newVertexName"
            className="form-control"
            value={newVertexName}
            onChange={onNewVertexChange}
          />
        </div>
      </form>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={onAddVertex}>
          Add Vertex
        </button>
        <button className="btn btn-danger" onClick={clearAll}>
          Clear All
        </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Vertex</th>
            <th>Outgoing</th>
            <th>Incoming</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {graph.vertices.map((vertex, i) => (
            <VertexRow key={i} vertex={vertex} buildGraph={buildGraph} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const versionReducer = (state: number): number => state + 1;

const defaultInitialGraph: Graph<string> = new Graph<string>()
  .addUnidirectionalEdge("a", "b")
  .addUnidirectionalEdge("b", "a")
  .addUnidirectionalEdge("b", "c")
  .addUnidirectionalEdge("b", "d")
  .addUnidirectionalEdge("d", "a");

export interface UseGraphBuilderProps {
  initialGraph?: Graph<string>;
  drawBoid?: BoidDraw<string, DataItemBoid>;
}

export const useGraphBuilder = ({
  initialGraph = defaultInitialGraph,
  drawBoid = defaultDataItemDraw,
}: UseGraphBuilderProps): Props => {
  const [version, tickVersion] = React.useReducer(versionReducer, 0);

  const graph = React.useRef<Graph<string>>(initialGraph);
  const [pendingFrom, prepareEdge] = React.useState<string | undefined>(
    undefined
  );

  const completeEdge = React.useCallback(
    (to: string) => {
      if (pendingFrom !== undefined) {
        graph.current.addUnidirectionalEdge(pendingFrom, to);
      }
      prepareEdge(undefined);
      tickVersion();
    },
    [pendingFrom]
  );
  const cancelEdge = React.useCallback(() => prepareEdge(undefined), [
    prepareEdge,
  ]);

  const clearAll = React.useCallback(() => {
    graph.current.vertices.forEach((v) => graph.current.removeVertex(v));
    tickVersion();
  }, [tickVersion]);
  return {
    drawBoid,
    buildGraph: {
      version,
      tickVersion,
      graph: graph.current,
      pendingFrom,
      prepareEdge,
      cancelEdge,
      completeEdge,
      clearAll,
    },
  };
};

export default GraphBuilder;
