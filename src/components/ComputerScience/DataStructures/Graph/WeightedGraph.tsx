import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";
import useSketch from "src/components/p5/P5Sketch/useSketch";
import Sketch from "./Sketch/Sketch";

const WeightedGraph: React.FunctionComponent = () => {
  const { graphData, componentProps } = useGraphBuilder();

  const { refContainer, updateConfig } = useSketch(Sketch);

  React.useEffect(() => updateConfig({ graphData }), [graphData, updateConfig]);

  return (
    <div>
      <GraphBuilder {...componentProps} />
      <div ref={refContainer} />
    </div>
  );
};

export default WeightedGraph;
