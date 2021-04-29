import { Optional } from "comp-sci-maths-lib/dist/types";
import React from "react";

interface Props {
  name: string;
  values: Optional<boolean>[];
}

const BusDisplay: React.FunctionComponent<Props> = ({ name, values }) => {
  return (
    <div>
      <h4>{name}</h4>
      <div>
        {values
          .map((value, index) => ({ value, index }))
          .reverse()
          .map(({ value, index }) => (
            <span key={index} className="binary-digit">
              {value ? "1" : "0"}
            </span>
          ))}
      </div>
    </div>
  );
};

export default BusDisplay;
