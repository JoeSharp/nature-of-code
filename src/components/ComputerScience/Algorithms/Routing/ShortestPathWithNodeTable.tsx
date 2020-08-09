import React from "react";
import { Optional, ToString } from "comp-sci-maths-lib/dist/types";

interface Item<T> {
  node: string;
  cost: number;
  viaNode: Optional<T>;
}

interface Props<T> {
  vertexToString: ToString<T>;
  items: Item<T>[];
}

const ShortestPathWithNodeTable = <T,>({ vertexToString, items }: Props<T>) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Node</th>
        <th>Cost</th>
        <th>Via Node</th>
      </tr>
    </thead>
    <tbody>
      {items.map(({ node, cost, viaNode }) => (
        <tr key={node}>
          <td>{node}</td>
          <td>{cost}</td>
          <td>{!!viaNode ? vertexToString(viaNode) : "NONE"}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ShortestPathWithNodeTable;
