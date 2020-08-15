import React from "react";
import ShortestPathWithNodeTable from "./ShortestPathWithNodeTable";
import { ObserverArgsWithPathFrom } from "comp-sci-maths-lib/dist/algorithms/routing/types";
import Table from "src/components/Bootstrap/Table";
import { BaseDataItem } from "src/components/p5/Boid/DataItemBoid";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

interface Props<DATA_ITEM extends BaseDataItem<any>> {
  graph: Graph<DATA_ITEM>;
  currentStage: ObserverArgsWithPathFrom<DATA_ITEM>;
}

const RouteObserverStage = <DATA_ITEM extends BaseDataItem<any>>({
  graph,
  currentStage: { shortestPathTree, currentItem, currentDistances, outgoing },
}: Props<DATA_ITEM>) => {
  const shortestPathTreeItems = React.useMemo(
    () =>
      Object.entries(shortestPathTree).map(([node, { cost, viaNode }]) => ({
        node: graph.getVertex(node)?.label || "NONE", // Ideally we would fetch back the original node...
        cost,
        viaNode,
      })),
    [shortestPathTree, graph]
  );
  const queueItems = React.useMemo(
    () =>
      currentDistances.toArray().map(({ node, cost, viaNode }) => ({
        node: node.label,
        cost,
        viaNode,
      })),
    [currentDistances]
  );
  const currentItemForTable = React.useMemo(() => {
    if (currentItem !== undefined) {
      return [{ ...currentItem, node: currentItem.node.label }];
    }
    return [];
  }, [currentItem]);

  const outgoingData = React.useMemo(
    () =>
      outgoing.map(({ to, weight }) => ({
        to: to.label,
        weight,
      })),
    [outgoing]
  );

  return (
    <React.Fragment>
      <h4>Current Item</h4>
      <ShortestPathWithNodeTable items={currentItemForTable} />
      <div className="routing-visual">
        <div className="mr-5">
          <h4>Unvisited Outgoing Links</h4>
          <Table headings={["to", "weight"]} data={outgoingData} />
        </div>
        <div className="mr-5">
          <h4>Routing Queue</h4>
          <ShortestPathWithNodeTable items={queueItems} />
        </div>
        <div>
          <h4>Shortest Path Tree</h4>
          <ShortestPathWithNodeTable items={shortestPathTreeItems} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default RouteObserverStage;
