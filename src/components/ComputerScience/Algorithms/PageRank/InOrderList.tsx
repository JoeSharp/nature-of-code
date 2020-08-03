import React from "react";
import { PageRanks } from "./types";

interface Props {
  ranks: PageRanks;
}

const InOrderList: React.FunctionComponent<Props> = ({ ranks }) => {
  const pagesInOrder: string[] = React.useMemo(
    () =>
      Object.entries(ranks)
        .sort((r1, r2) => r2[1] - r1[1]) // compare the values
        .map(r => r[0]), // return the keys, now sorted
    [ranks]
  );

  return (
    <ol>
      {pagesInOrder.map(p => (
        <li key={p}>{p}</li>
      ))}
    </ol>
  );
};

export default InOrderList;
