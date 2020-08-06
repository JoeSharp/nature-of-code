import React from "react";
import GraphBuilder, { useGraphBuilder } from "../../GraphBuilder";

const GraphComponent: React.FunctionComponent = () => {
  const graphBuilderProps = useGraphBuilder();

  return (
    <div>
      <GraphBuilder {...graphBuilderProps} />
    </div>
  );
};

export default GraphComponent;
