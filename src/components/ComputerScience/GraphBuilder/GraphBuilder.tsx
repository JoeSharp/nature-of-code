import React from "react";
import VertexRow from "./VertexRow";
import { UseGraphBuilder } from "./types";

import "./graphBuilder.css";
import Checkbox from "src/components/Bootstrap/Checkbox";

interface Props {
  graphBuilder: UseGraphBuilder<string>;
}

const GraphBuilder: React.FunctionComponent<Props> = ({
  graphBuilder,
}: Props) => {
  const {
    version,
    graph,
    setNewEdgeWeight,
    newEdgeWeight,
    clearAll,
    sketchUse,
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

  const { updateConfig, refContainer } = sketchUse;

  React.useEffect(() => updateConfig({ graph, physicsEnabled }), [
    physicsEnabled,
    graph,
    updateConfig,
  ]);

  return (
    <div>
      <h2>Build Graph (v{version})</h2>
      <Checkbox
        id="chkPhysics"
        checked={physicsEnabled}
        onChange={onPhysicsEnabledChange}
        label="Physics Enabled"
      />

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
      <table className="table table-striped table-bordered table-sm">
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
