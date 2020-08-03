import React from "react";
import useBuildGraph from "./useBuildGraph";
import VertexRow from "./VertexRow";
import { UseBuildGraph } from "./types";
import useSketch from "src/components/p5/P5Sketch/useSketch";
import Sketch from "src/components/ComputerScience/DataStructures/Graph/Sketch";

interface Props {
  buildGraph: UseBuildGraph;
}

const GraphBuilder: React.FunctionComponent<Props> = ({ buildGraph }) => {
  const {
    graphBuilder: { graphData },
    clearAll,
    addVertex,
  } = buildGraph;

  const [newVertexName, setNewVertexName] = React.useState<string>("Z");
  const onAddVertex = React.useCallback(
    () => newVertexName.length > 0 && addVertex(newVertexName),
    [newVertexName, addVertex]
  );
  const onNewVertexChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewVertexName(value),
    [setNewVertexName]
  );

  const { refContainer, updateConfig } = useSketch(Sketch);

  React.useEffect(() => updateConfig({ graphData }), [graphData, updateConfig]);

  return (
    <div>
      <h2>Build Graph</h2>
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
          {graphData.vertices.map((vertex, i) => (
            <VertexRow key={i} vertex={vertex} buildGraph={buildGraph} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface UseGraphBuilder {
  componentProps: Props;
}

export const useGraphBuilder = (): UseGraphBuilder => {
  const buildGraph = useBuildGraph();

  return {
    componentProps: { buildGraph },
  };
};

export default GraphBuilder;
