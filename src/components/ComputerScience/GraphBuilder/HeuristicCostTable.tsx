import React from "react";
import { HeuristicCostById } from "./types";

interface Props {
  heuristicCostsById: HeuristicCostById;
}

const HeuristicCostTable: React.FunctionComponent<Props> = ({
  heuristicCostsById,
}) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Heuristic Cost</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(heuristicCostsById).map(([id, cost]) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{cost}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default HeuristicCostTable;
