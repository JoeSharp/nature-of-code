import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";
import { defaultStringGraph } from "../../GraphBuilder/useGraphBuilder";

const GraphComponent: React.FunctionComponent = () => {
  const graphBuilder = useGraphBuilder(defaultStringGraph);

  return (
    <div>
      <GraphBuilder graphBuilder={graphBuilder} />
    </div>
  );
};

export default GraphComponent;
