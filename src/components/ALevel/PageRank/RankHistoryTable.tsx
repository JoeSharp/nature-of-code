import React from "react";

import { PageRanks } from "./types";
import { roundTo2Dp } from "ocr-cs-alevel-ts/dist/algorithms/pageRank/pageRank";

interface Props {
  pages: Set<string>;
  rankHistory: PageRanks[];
}

const RankHistoryTable: React.FunctionComponent<Props> = ({
  pages,
  rankHistory,
}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Page</th>
          {rankHistory.map((r, i) => (
            <th key={i}>{i}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...pages].map((page) => (
          <tr key={page}>
            <td>{page}</td>
            {rankHistory.map((r, i) => (
              <td key={i}>{roundTo2Dp(r[page])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankHistoryTable;
