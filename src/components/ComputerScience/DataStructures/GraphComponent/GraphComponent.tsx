import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";

const GraphComponent: React.FunctionComponent = () => {
  const buildGraph = useGraphBuilder();

  return (
    <div>
      <GraphBuilder buildGraph={buildGraph} />
    </div>
  );
};

export default GraphComponent;
