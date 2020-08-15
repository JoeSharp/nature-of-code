import { BaseDataItem } from "src/components/p5/Boid/DataItemBoid";
import React from "react";
import useSketch from "src/components/p5/useSketch";
import { GraphSketchConfig } from "./types";
import GraphSketch from "./GraphSketch";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

export default <DATA_ITEM extends BaseDataItem<any>>(
  graph: Graph<DATA_ITEM>
) => {
  const sketchUse = useSketch<
    GraphSketchConfig<DATA_ITEM>,
    GraphSketch<DATA_ITEM>
  >(GraphSketch);

  const { updateConfig } = sketchUse;

  React.useEffect(() => updateConfig({ graph }), [graph, updateConfig]);

  return sketchUse;
};
