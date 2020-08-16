import { BaseDataItem } from "src/components/p5/Boid/types";
import React from "react";
import useSketch from "src/components/p5/useSketch";
import { GraphSketchConfig } from "./GraphBuilder/types";
import GraphSketch from "./GraphSketch";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { PositionByVertex } from "./types";

interface Props<DATA_ITEM extends BaseDataItem<any>> {
  graph: Graph<DATA_ITEM>;
  vertexPositions?: PositionByVertex;
}

export default <DATA_ITEM extends BaseDataItem<any>>({
  graph,
  vertexPositions,
}: Props<DATA_ITEM>) => {
  const sketchUse = useSketch<
    GraphSketchConfig<DATA_ITEM>,
    GraphSketch<DATA_ITEM>
  >(GraphSketch);

  const { updateConfig } = sketchUse;

  React.useEffect(() => updateConfig({ graph, vertexPositions }), [
    graph,
    vertexPositions,
    updateConfig,
  ]);

  return sketchUse;
};
