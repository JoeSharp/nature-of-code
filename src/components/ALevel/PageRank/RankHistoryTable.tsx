import React from "react";
import { roundTo2Dp } from "./usePageRank";
import { PageRanks } from "./types";

interface Props {
  pages: string[];
  rankHistory: PageRanks[];
}

const RankHistoryTable: React.FunctionComponent<Props> = ({
  pages,
  rankHistory
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
        {pages.map(page => (
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
