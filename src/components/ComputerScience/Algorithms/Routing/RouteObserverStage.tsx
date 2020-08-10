import React from "react";
import ShortestPathWithNodeTable from "./ShortestPathWithNodeTable";
import { ObserverArgsWithPathFrom } from "comp-sci-maths-lib/dist/algorithms/routing/types";
import { ToString } from "comp-sci-maths-lib/dist/types";

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

  return (
    <React.Fragment>
      <h2>Current Item</h2>
      <ShortestPathWithNodeTable
        vertexToString={vertexToString}
        items={currentItemForTable}
      />
      <div className="routing-visual">
        <div>
          <h2>Unvisited Outgoing Links</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Node</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {outgoing
                .map(({ to, weight }) => ({ to: vertexToString(to), weight }))
                .map(({ to, weight }) => (
                  <tr key={to}>
                    <td>{to}</td>
                    <td>{weight}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Routing Queue</h2>
          <ShortestPathWithNodeTable
            vertexToString={vertexToString}
            items={queueItems}
          />
        </div>
        <div>
          <h2>Shortest Path Tree</h2>
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
