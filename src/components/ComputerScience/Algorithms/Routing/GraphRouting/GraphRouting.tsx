import React from "react";

import useRoutingAlgorithm from "../useRoutingAlgorithm";
import VertexPicker, {
  usePicker as useVertexPicker,
} from "src/components/ComputerScience/DataStructures/GraphManager/GraphBuilder/VertexPicker";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";
import RouteObserverStage from "../RouteObserverStage";
import HeuristicCostTable from "src/components/ComputerScience/Algorithms/Routing/HeuristicCostTable";
import { StringDataItem } from "src/components/p5/Boid/types";

import GraphPickerWithSketch, {
  usePicker as useGraphPicker,
} from "src/components/ComputerScience/DataStructures/GraphManager/GraphPickerWithSketch";
import ButtonBar, {
  Props as ButtonBarProps,
} from "src/components/Bootstrap/Buttons/ButtonBar";

const GraphRouting: React.FunctionComponent = () => {
  const {
    graph,
    componentProps: graphPickerProps,
    sketchUse: { sketchContainer },
  } = useGraphPicker("complexStringGraph");

  const {
    vertex: sourceNode,
    componentProps: sourcePickerProps,
  } = useVertexPicker(graph, "form-control");
  const {
    vertex: destinationNode,
    componentProps: destinationPickerProps,
  } = useVertexPicker(graph, "form-control");

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
        (sourceNode && graph.areVerticesEqual(sourceNode, v)) ||
        (destinationNode && graph.areVerticesEqual(destinationNode, v))
      ) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setBorderColour(v, "black");
        sketchContainer.setColour(v, "green");
      } else if (
        currentStage !== undefined &&
        currentStage.currentItem !== undefined &&
        currentStage.currentItem.node.key === v.key
      ) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setBorderColour(v, "red");
      } else if (
        currentStage !== undefined &&
        currentStage.pathFrom.map((p) => p.key).includes(v.key)
      ) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setBorderColour(v, "red");
      } else {
        sketchContainer.setBorderWeight(v, 1);
        sketchContainer.setBorderColour(v, "black");
        sketchContainer.setColour(v, "blue");
      }
    });
  }, [sourceNode, destinationNode, currentStage, graph, path, sketchContainer]);

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          styleType: "primary",
          onClick: onHarvestDistances,
          text: "Harvest Distances",
        },
        {
          styleType: "danger",
          onClick: onResetDistances,
          text: "Clear Distances",
        },
      ],
    }),
    [onHarvestDistances, onResetDistances]
  );

  return (
    <div>
      <GraphPickerWithSketch {...graphPickerProps} />
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
        <ButtonBar {...buttonBarProps} />
      </div>

      <HeuristicCostTable graph={graph} heuristicCostsById={heuristicCosts} />

      <SteppingControls {...steppingControlProps} />

      {currentStage && (
        <div className="mt-3">
          <RouteObserverStage graph={graph} currentStage={currentStage} />
        </div>
      )}
    </div>
  );
};

export default GraphRouting;
