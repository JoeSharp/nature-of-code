import React from "react";
import { PageRanks } from "./types";
import { roundTo2Dp } from "ocr-cs-alevel-ts/dist/algorithms/pageRank/pageRank";

interface Props {
  pages: Set<string>;
  ranks: PageRanks;
}

const CurrentRanksRable: React.FunctionComponent<Props> = ({
  pages,
  ranks,
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
        {[...pages].map((page) => (
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
