import React from "react";

import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

import GraphBuilder, { useGraphBuilder } from "../../../GraphBuilder";
import useRoutingAlgorithm from "../useRoutingAlgorithm";
import VertexPicker, {
  usePicker as useVertexPicker,
} from "../../../GraphBuilder/VertexPicker";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";
import RouteObserverStage from "../RouteObserverStage";
import HeuristicCostTable from "src/components/ComputerScience/Algorithms/Routing/HeuristicCostTable";
import {
  StringDataItem,
  createSimpleStringDataItem,
} from "src/components/p5/Boid/DataItemBoid";

const VERTEX_A = createSimpleStringDataItem("A");
const VERTEX_B = createSimpleStringDataItem("B");
const VERTEX_C = createSimpleStringDataItem("C");
const VERTEX_D = createSimpleStringDataItem("D");
const VERTEX_E = createSimpleStringDataItem("E");
const VERTEX_F = createSimpleStringDataItem("F");
const VERTEX_G = createSimpleStringDataItem("G");
const VERTEX_H = createSimpleStringDataItem("H");
const VERTEX_I = createSimpleStringDataItem("I");
const VERTEX_J = createSimpleStringDataItem("J");
const VERTEX_K = createSimpleStringDataItem("K");
const VERTEX_L = createSimpleStringDataItem("L");
const VERTEX_S = createSimpleStringDataItem("S");

const initialGraph = new Graph<StringDataItem>({
  vertexToString: (v) => v.key,
  equalityCheck: (a, b) => a.key === b.key,
})
  .addBiDirectionalEdge(VERTEX_S, VERTEX_A, 7)
  .addBiDirectionalEdge(VERTEX_S, VERTEX_B, 2)
  .addBiDirectionalEdge(VERTEX_S, VERTEX_C, 3)
  .addBiDirectionalEdge(VERTEX_A, VERTEX_D, 4)
  .addBiDirectionalEdge(VERTEX_A, VERTEX_B, 3)
  .addBiDirectionalEdge(VERTEX_B, VERTEX_D, 4)
  .addBiDirectionalEdge(VERTEX_B, VERTEX_H, 1)
  .addBiDirectionalEdge(VERTEX_C, VERTEX_L, 2)
  .addBiDirectionalEdge(VERTEX_D, VERTEX_F, 5)
  .addBiDirectionalEdge(VERTEX_E, VERTEX_K, 5)
  .addBiDirectionalEdge(VERTEX_E, VERTEX_G, 2)
  .addBiDirectionalEdge(VERTEX_F, VERTEX_H, 3)
  .addBiDirectionalEdge(VERTEX_G, VERTEX_H, 2)
  .addBiDirectionalEdge(VERTEX_I, VERTEX_L, 4)
  .addBiDirectionalEdge(VERTEX_I, VERTEX_K, 4)
  .addBiDirectionalEdge(VERTEX_J, VERTEX_L, 4)
  .addBiDirectionalEdge(VERTEX_J, VERTEX_K, 4);

const GraphRouting: React.FunctionComponent = () => {
  const graphBuilder = useGraphBuilder<StringDataItem>(initialGraph);
  const {
    version,
    graph,
    sketchUse: { sketchContainer },
  } = graphBuilder;

  const {
    vertex: sourceNode,
    componentProps: sourcePickerProps,
  } = useVertexPicker(version, graph, "form-control");
  const {
    vertex: destinationNode,
    componentProps: destinationPickerProps,
  } = useVertexPicker(version, graph, "form-control");

  const getPositionOfNode = React.useCallback(
    (d: StringDataItem) => {
      const boid = sketchContainer.getBoid(d);
      return !!boid ? boid.position : undefined;
    },
    [sketchContainer]
  );

  const {
    path,
    stages,
    onHarvestDistances,
    onResetDistances,
    heuristicCosts,
  } = useRoutingAlgorithm({
    version,
    graph,
    sourceNode,
    destinationNode,
    getPositionOfNode,
  });

  const {
    item: currentStage,
    componentProps: steppingControlProps,
  } = useSteppingControls(stages);

  React.useEffect(() => {
    graph.vertices.forEach((v) => {
      if (
        (sourceNode && graph.equalityCheck(sourceNode, v)) ||
        (destinationNode && graph.equalityCheck(destinationNode, v))
      ) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setColour(v, "green");
      } else if (path.map((p) => p.key).includes(v.key)) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setColour(v, "red");
      } else {
        sketchContainer.setBorderWeight(v, 1);
        sketchContainer.setColour(v, "blue");
      }
    });
  }, [sourceNode, destinationNode, graph, path, sketchContainer]);

  return (
    <div>
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
      </form>
      <div className="mb-3">
        <p>
          The A* algorithm is an enchancement on Dijkstras. It takes into
          account the estimated distance from a given node to the endpoint when
          calculating the cost for it's priority queue. To make use of this
          enhancement, click on 'Harvest Distances' and the euclidean distances
          from each node to the destination will be calculated and used as part
          of the routing algorithm.
        </p>
        <button className="btn btn-primary mr-2" onClick={onHarvestDistances}>
          Harvest Distances
        </button>
        <button className="btn btn-danger" onClick={onResetDistances}>
          Reset Distances
        </button>
      </div>

      <HeuristicCostTable heuristicCostsById={heuristicCosts} />

      <SteppingControls {...steppingControlProps} />

      {currentStage && (
        <div className="mt-3">
          <RouteObserverStage graph={graph} currentStage={currentStage} />
        </div>
      )}

      <GraphBuilder graphBuilder={graphBuilder} />
    </div>
  );
};

export default GraphRouting;
