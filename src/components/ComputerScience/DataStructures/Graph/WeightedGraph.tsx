import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";

const WeightedGraph: React.FunctionComponent = () => {
  const { componentProps } = useGraphBuilder();

  return (
    <div>
      <GraphBuilder {...componentProps} />
    </div>
  );
};

export default WeightedGraph;
