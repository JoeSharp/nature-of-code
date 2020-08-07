import React from "react";

import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";
import useRoutingAlgorithm from "./useRoutingAlgorithm";
import VertexPicker, { usePicker } from "./VertexPicker";
import { BoidDrawDetails } from "src/components/p5/Boid/types";
import useItemInArray from "src/components/lib/useLoopCounter/useItemInArray";
import { useToggledInterval } from "src/components/lib/useInterval";

const initialGraph = new Graph<string>()
  .addBiDirectionalEdge("S", "A", 7)
  .addBiDirectionalEdge("S", "B", 2)
  .addBiDirectionalEdge("S", "C", 3)
  .addBiDirectionalEdge("A", "D", 4)
  .addBiDirectionalEdge("A", "B", 3)
  .addBiDirectionalEdge("B", "D", 4)
  .addBiDirectionalEdge("B", "H", 1)
  .addBiDirectionalEdge("C", "L", 2)
  .addBiDirectionalEdge("D", "F", 5)
  .addBiDirectionalEdge("E", "K", 5)
  .addBiDirectionalEdge("E", "G", 2)
  .addBiDirectionalEdge("F", "H", 3)
  .addBiDirectionalEdge("G", "H", 2)
  .addBiDirectionalEdge("I", "L", 4)
  .addBiDirectionalEdge("I", "K", 4)
  .addBiDirectionalEdge("J", "L", 4)
  .addBiDirectionalEdge("J", "K", 4);

const isEndpointDrawDetails: BoidDrawDetails = {
  borderWeight: 3,
  colour: "green",
};
const inPathDrawDetails: BoidDrawDetails = {
  borderWeight: 3,
  colour: "red",
};
const notInPathDrawDetails: BoidDrawDetails = {
  borderWeight: 1,
  colour: "blue",
};

const GraphRouting: React.FunctionComponent = () => {
  const buildGraph = useGraphBuilder(initialGraph);
  const {
    version,
    graph,
    drawDetails: { setDetails },
  } = buildGraph;

  const { vertex: sourceNode, componentProps: sourcePickerProps } = usePicker(
    version,
    graph,
    "form-control"
  );
  const {
    vertex: destinationNode,
    componentProps: destinationPickerProps,
  } = usePicker(version, graph, "form-control");

  const { path, stages } = useRoutingAlgorithm({
    version,
    graph,
    sourceNode,
    destinationNode,
  });

  const {
    item: currentStage,
    index,
    stepForward,
    stepBackward,
  } = useItemInArray({ items: stages });

  // Only auto iterate forward if we aren't on the final step
  const autoStepForward = React.useCallback(() => {
    if (index < stages.length - 1) {
      stepForward();
    }
  }, [index, stages.length, stepForward]);

  const {
    isAutoIterating,
    onChange: onAutoIterateChange,
  } = useToggledInterval({ iterate: autoStepForward, interval: 500 });

  React.useEffect(() => {
    graph.vertices.forEach((v) => {
      if (sourceNode === v || destinationNode === v) {
        setDetails(v, isEndpointDrawDetails);
      } else if (path.includes(v)) {
        setDetails(v, inPathDrawDetails);
      } else {
        setDetails(v, notInPathDrawDetails);
      }
    });
  }, [sourceNode, destinationNode, graph, path, setDetails]);

  return (
    <div>
      <h1>Routing Algorithms - Using Graph</h1>

      <h2>Choose Endpoints</h2>
      <form>
        <div className="form-group">
          <label>Source</label>
          <VertexPicker {...sourcePickerProps} />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <VertexPicker {...destinationPickerProps} />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isAutoIterating}
            onChange={onAutoIterateChange}
            id="chkAutoIterate"
          />
          <label className="form-check-label" htmlFor="chkAutoIterate">
            Auto Iterate
          </label>{" "}
        </div>
      </form>

      <h2>Shortest Path</h2>
      <ol>
        {path.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ol>
      <h2>This Stage</h2>
      <ol>
        {currentStage && currentStage.pathFrom.map((p) => <li key={p}>{p}</li>)}
      </ol>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={stepBackward}>
          Back
        </button>
        <button className="btn btn-primary" onClick={stepForward}>
          Forward
        </button>
      </div>

      <GraphBuilder buildGraph={buildGraph} />
    </div>
  );
};

export default GraphRouting;
