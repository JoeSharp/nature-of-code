import React from "react";
import { PageRanks } from "./types";
import { StringDataItem } from "src/components/p5/Boid/types";

interface Props {
  pages: StringDataItem[];
  ranks: PageRanks;
}

const InOrderList: React.FunctionComponent<Props> = ({ pages, ranks }) => {
  const pagesInOrder: string[] = React.useMemo(
    () =>
      Object.entries(ranks)
        .sort((r1, r2) => r2[1] - r1[1]) // compare the values
        .map((r) => pages.find((v) => v.key === r[0]))
        .map((v) => (v !== undefined ? v.label : "ERROR")), // return the keys, now sorted
    [pages, ranks]
  );

  return (
    <ol>
      {pagesInOrder.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ol>
  );
};

export default InOrderList;
