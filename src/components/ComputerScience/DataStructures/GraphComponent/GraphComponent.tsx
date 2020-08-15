import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";
import simpleGraph from "./cannedGraphs/simpleStringGraph";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import GraphPicker from "./GraphPicker";
import useSavedGraph from "./useSavedGraph";
import { StringDataItem } from "src/components/p5/Boid/DataItemBoid";

const initialGraph = simpleGraph();

const GraphComponent: React.FunctionComponent = () => {
  const { addOrUpdate, reset } = useSavedGraph();
  const [graphName, setGraphName] = React.useState<string>("");

  const [graph, setGraph] = React.useState<Graph<any>>(initialGraph);
  const onGraphNameChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setGraphName(value),
    [setGraphName]
  );

  const onGraphChange = React.useCallback(
    (name: string, graph: Graph<StringDataItem>) => {
      setGraph(graph);
      setGraphName(name);
    },
    [setGraph, setGraphName]
  );
  const graphBuilder = useGraphBuilder(graph);
  const { changeGraph } = graphBuilder;

  React.useEffect(() => {
    changeGraph(graph);
  }, [graph, changeGraph]);

  const onSave = React.useCallback(() => addOrUpdate(graphName, graph), [
    addOrUpdate,
    graphName,
    graph,
  ]);

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="txtNewGraph">Graph Name</label>
          <input
            id="txtNewGraph"
            className="form-control"
            value={graphName}
            onChange={onGraphNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="selectGraph">Graph</label>
          <GraphPicker onChange={onGraphChange} />
        </div>
      </form>
      <button className="btn btn-primary" onClick={onSave}>
        Save
      </button>
      <button className="ml-3 btn btn-danger" onClick={reset}>
        Reset
      </button>

      <GraphBuilder graphBuilder={graphBuilder} />
    </div>
  );
};

export default GraphComponent;
