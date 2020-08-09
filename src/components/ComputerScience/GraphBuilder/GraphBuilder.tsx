import React from "react";
import VertexRow from "./VertexRow";
import useSketch from "src/components/p5/useSketch";
import GraphSketch from "src/components/ComputerScience/GraphBuilder/GraphSketch";
import { UseGraphBuilder } from "./types";

import "./graphBuilder.css";

interface Props {
  graphBuilder: UseGraphBuilder<string>;
}

const GraphBuilder: React.FunctionComponent<Props> = ({
  graphBuilder,
}: Props) => {
  const {
    graph,
    setNewEdgeWeight,
    newEdgeWeight,
    drawDetails: { drawDetails },
    clearAll,
  } = graphBuilder;

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

  const onNewEdgeWeightChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewEdgeWeight(parseInt(value)),
    [setNewEdgeWeight]
  );

  const [physicsEnabled, setPhysicsEnabled] = React.useState<boolean>(true);
  const onPhysicsEnabledChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { checked } }) => setPhysicsEnabled(checked),
    [setPhysicsEnabled]
  );

  const { refContainer, updateConfig } = useSketch(GraphSketch);

  React.useEffect(() => updateConfig({ graph, physicsEnabled, drawDetails }), [
    physicsEnabled,
    graph,
    updateConfig,
    drawDetails,
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
        <div className="form-group">
          <label htmlFor="newEdgeWeight">New Edge Weight</label>
          <input
            id="newEdgeWeight"
            className="form-control"
            type="number"
            value={newEdgeWeight}
            onChange={onNewEdgeWeightChange}
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
            <VertexRow key={i} vertex={vertex} graphBuilder={graphBuilder} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GraphBuilder;
