import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";

const GraphComponent: React.FunctionComponent = () => {
  const { componentProps } = useGraphBuilder();

  return (
    <div>
      <GraphBuilder {...componentProps} />
    </div>
  );
};

export default GraphComponent;
