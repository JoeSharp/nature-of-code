import React from "react";
import { Optional } from "comp-sci-maths-lib/dist/types";
import Table from "src/components/Bootstrap/Table";
import { roundTo2Dp } from "comp-sci-maths-lib/dist/algorithms/pageRank/pageRank";
import { BaseDataItem } from "src/components/p5/Boid/DataItemBoid";

interface Item<DATA_ITEM extends BaseDataItem<any>> {
  node: string;
  cost: number;
  viaNode: Optional<DATA_ITEM>;
}

interface Props<DATA_ITEM extends BaseDataItem<any>> {
  items: Item<DATA_ITEM>[];
}

const ShortestPathWithNodeTable = <DATA_ITEM extends BaseDataItem<any>>({
  items,
}: Props<DATA_ITEM>) => {
  const tableData = React.useMemo(
    () =>
      items.map(({ node, cost, viaNode }) => ({
        node,
        cost: roundTo2Dp(cost),
        viaNode: viaNode ? viaNode.label : "NONE",
      })),
    [items]
  );

  return <Table headings={["node", "cost", "viaNode"]} data={tableData} />;
};

export default ShortestPathWithNodeTable;
