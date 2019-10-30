import React from "react";
import { roundTo2Dp } from "./usePageRank";
import { PageRanks } from "./types";

interface Props {
  pages: string[];
  ranks: PageRanks;
}

const CurrentRanksRable: React.FunctionComponent<Props> = ({
  pages,
  ranks
}) => {
  return (
    <table className="table table-striped table-sm">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>Page</th>
          <th style={{ width: "20%" }}>Rank (2 d.p)</th>
          <th>Rank</th>
        </tr>
      </thead>
      <tbody>
        {pages.map(page => (
          <tr key={page}>
            <td>{page}</td>
            <td>{roundTo2Dp(ranks[page])}</td>
            <td>{ranks[page]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrentRanksRable;
