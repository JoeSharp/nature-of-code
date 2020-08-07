import React from "react";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { Optional } from "comp-sci-maths-lib/dist/types";

interface Item<T> {
  node: string;
  cost: number;
  viaNode: Optional<T>;
}

interface Props<T> {
  graph: Graph<T>;
  items: Item<T>[];
}

const ShortestPathWithNodeTable = <T,>({
  graph: { vertexToString },
  items,
}: Props<T>) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Node</th>
        <th>Cost</th>
        <th>Via Node</th>
      </tr>
    </thead>
    {items.map(({ node, cost, viaNode }) => (
      <tr>
        <td>{node}</td>
        <td>{cost}</td>
        <td>{!!viaNode ? vertexToString(viaNode) : "NONE"}</td>
      </tr>
    ))}
  </table>
);

export default ShortestPathWithNodeTable;
