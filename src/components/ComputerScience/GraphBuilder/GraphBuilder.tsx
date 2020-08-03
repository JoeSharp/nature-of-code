import React from "react";
import useBuildGraph from "./useBuildGraph";
import Vertex from "./Vertex";
import { UseBuildGraph } from "./types";
import { GraphData } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

interface Props {
  buildGraph: UseBuildGraph;
}

const GraphBuilder: React.FunctionComponent<Props> = ({ buildGraph }) => {
  const {
    graphBuilder: {
      graph: { vertices },
    },
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

  return (
    <div>
      <h2>Build Graph</h2>
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
      <button className="btn btn-primary" onClick={onAddVertex}>
        Add Vertex
      </button>
      <button className="btn btn-danger" onClick={clearAll}>
        Clear All
      </button>
      <div className="row">
        {vertices.map((vertex, i) => (
          <div className="col-sm-4" key={i}>
            <Vertex vertex={vertex} buildGraph={buildGraph} />
          </div>
        ))}
      </div>
    </div>
  );
};

interface UseGraphBuilder {
  graphData: GraphData<string>;
  componentProps: Props;
}

export const useGraphBuilder = (): UseGraphBuilder => {
  const buildGraph = useBuildGraph();

  return {
    componentProps: { buildGraph },
    graphData: buildGraph.graphBuilder.graph,
  };
};

export default GraphBuilder;
