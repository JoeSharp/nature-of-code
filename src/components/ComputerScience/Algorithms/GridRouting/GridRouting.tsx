import React from "react";
import useSketch from "src/components/p5/useSketch";
import GridSketch from "./GridSketch";
import useGridGraph from "./useGridGraph";
import useRoutingAlgorithm from "../GraphRouting/useRoutingAlgorithm";

const GridRouting: React.FunctionComponent = () => {
  const { refContainer, updateConfig } = useSketch(GridSketch);

  const {
    version,
    graph,
    topLeft: sourceNode,
    bottomRight: destinationNode,
  } = useGridGraph({
    rows: 8,
    columns: 15,
  });

  const { path } = useRoutingAlgorithm({
    version,
    graph,
    sourceNode,
    destinationNode,
  });

  React.useEffect(() => {
    updateConfig({ graph, path });
  }, [path, graph, updateConfig]);

  return (
    <div>
      <h1>Routing Algorithms - Using Grids</h1>

      <div ref={refContainer} />
    </div>
  );
};

export default GridRouting;
