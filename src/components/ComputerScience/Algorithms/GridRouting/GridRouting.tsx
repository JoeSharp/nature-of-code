import React from "react";
import useSketch from "src/components/p5/useSketch";
import GridSketch from "./GridSketch";
import useGridGraph from "./useGridGraph";
import useRoutingAlgorithm from "../GraphRouting/useRoutingAlgorithm";
import ShortestPathWithNodeTable from "./ShortestPathWithNodeTable";
import Checkbox from "src/components/lib/Checkbox";

import "./routing.css";
import SteppingControls, {
  useSteppingControls,
} from "src/components/lib/SteppingControls";

const GridRouting: React.FunctionComponent = () => {
  const { refContainer, updateConfig } = useSketch(GridSketch);

  const {
    version,
    graph,
    topLeft: sourceNode,
    bottomRight: destinationNode,
    toggleConnection,
  } = useGridGraph({
    rows: 8,
    columns: 15,
  });

  const { stages, path } = useRoutingAlgorithm({
    version,
    graph,
    sourceNode,
    destinationNode,
  });

  const {
    item: { currentItem, currentDistances, pathFrom, shortestPathTree },
    componentProps: steppingControlProps,
  } = useSteppingControls(stages);

  const [showFinalPath, setShowFinalPath] = React.useState<boolean>(false);
  const onShowFinalPathChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { checked } }) => setShowFinalPath(checked),
    [setShowFinalPath]
  );

  React.useEffect(() => {
    updateConfig({
      graph,
      path: showFinalPath ? path : pathFrom,
      toggleConnection,
    });
  }, [showFinalPath, path, pathFrom, graph, updateConfig, toggleConnection]);

  const shortestPathTreeItems = React.useMemo(
    () =>
      Object.entries(shortestPathTree).map(([node, { cost, viaNode }]) => ({
        node,
        cost,
        viaNode,
      })),
    [shortestPathTree]
  );
  const queueItems = React.useMemo(
    () =>
      currentDistances.toArray().map(({ node, cost, viaNode }) => ({
        node: graph.vertexToString(node),
        cost,
        viaNode,
      })),
    [graph, currentDistances]
  );
  const currentItemForTable = React.useMemo(() => {
    if (currentItem !== undefined) {
      return [{ ...currentItem, node: graph.vertexToString(currentItem.node) }];
    }
    return [];
  }, [currentItem, graph]);

  return (
    <div>
      <h1>Routing Algorithms - Using Grids</h1>

      <form>
        <Checkbox
          id="chkFinalPath"
          checked={showFinalPath}
          onChange={onShowFinalPathChange}
          label="Show Final Path"
        />
      </form>

      <SteppingControls {...steppingControlProps} />

      <div ref={refContainer} />

      <h2>Current Item</h2>
      <ShortestPathWithNodeTable graph={graph} items={currentItemForTable} />

      <div className="routing-visual">
        <div>
          <h2>Routing Queue</h2>
          <ShortestPathWithNodeTable graph={graph} items={queueItems} />
        </div>
        <div>
          <h2>Shortest Path Tree</h2>
          <ShortestPathWithNodeTable
            graph={graph}
            items={shortestPathTreeItems}
          />
        </div>
      </div>
    </div>
  );
};

export default GridRouting;
