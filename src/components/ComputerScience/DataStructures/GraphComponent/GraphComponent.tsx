import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";
import { defaultStringGraph } from "../../GraphBuilder/useGraphBuilder";

const GraphComponent: React.FunctionComponent = () => {
  const buildGraph = useGraphBuilder(defaultStringGraph);

  return (
    <div>
      <GraphBuilder buildGraph={buildGraph} />
    </div>
  );
};

export default GraphComponent;
