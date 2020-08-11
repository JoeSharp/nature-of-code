import React from "react";
import ShortestPathWithNodeTable from "./ShortestPathWithNodeTable";
import { ObserverArgsWithPathFrom } from "comp-sci-maths-lib/dist/algorithms/routing/types";
import { ToString } from "comp-sci-maths-lib/dist/types";
import Table from "src/components/Bootstrap/Table";

interface Props<T> {
  vertexToString: ToString<T>;
  currentStage: ObserverArgsWithPathFrom<T>;
}

const RouteObserverStage = <T,>({
  vertexToString,
  currentStage: { shortestPathTree, currentItem, currentDistances, outgoing },
}: Props<T>) => {
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
        node: vertexToString(node),
        cost,
        viaNode,
      })),
    [vertexToString, currentDistances]
  );
  const currentItemForTable = React.useMemo(() => {
    if (currentItem !== undefined) {
      return [{ ...currentItem, node: vertexToString(currentItem.node) }];
    }
    return [];
  }, [currentItem, vertexToString]);

  const outgoingData = React.useMemo(
    () =>
      outgoing.map(({ to, weight }) => ({
        to: vertexToString(to),
        weight,
      })),
    [outgoing, vertexToString]
  );

  return (
    <React.Fragment>
      <h4>Current Item</h4>
      <ShortestPathWithNodeTable
        vertexToString={vertexToString}
        items={currentItemForTable}
      />
      <div className="routing-visual">
        <div className="mr-5">
          <h4>Unvisited Outgoing Links</h4>
          <Table headings={["to", "weight"]} data={outgoingData} />
        </div>
        <div className="mr-5">
          <h4>Routing Queue</h4>
          <ShortestPathWithNodeTable
            vertexToString={vertexToString}
            items={queueItems}
          />
        </div>
        <div>
          <h4>Shortest Path Tree</h4>
          <ShortestPathWithNodeTable
            vertexToString={vertexToString}
            items={shortestPathTreeItems}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default RouteObserverStage;
