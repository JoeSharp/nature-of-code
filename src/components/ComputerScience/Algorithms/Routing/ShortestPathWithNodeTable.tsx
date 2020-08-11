import React from "react";
import { Optional, ToString } from "comp-sci-maths-lib/dist/types";
import Table from "src/components/Bootstrap/Table";
import { roundTo2Dp } from "comp-sci-maths-lib/dist/algorithms/pageRank/pageRank";

interface Item<T> {
  node: string;
  cost: number;
  viaNode: Optional<T>;
}

interface Props<T> {
  vertexToString: ToString<T>;
  items: Item<T>[];
}

const ShortestPathWithNodeTable = <T,>({ vertexToString, items }: Props<T>) => {
  const tableData = React.useMemo(
    () =>
      items.map(({ node, cost, viaNode }) => ({
        node,
        cost: roundTo2Dp(cost),
        viaNode: viaNode ? vertexToString(viaNode) : "NONE",
      })),
    [items, vertexToString]
  );

  return <Table headings={["node", "cost", "viaNode"]} data={tableData} />;
};

export default ShortestPathWithNodeTable;
