import React from "react";

interface Props {
  numerator: string | number | React.ReactElement;
  denominator: string | number | React.ReactElement;
}

const Fraction: React.FunctionComponent<Props> = ({
  numerator,
  denominator,
}) => (
  <span>
    {numerator}&frasl;{denominator}
  </span>
);

export default Fraction;
