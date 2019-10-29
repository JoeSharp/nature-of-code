import React from "react";

import Sketch from "./Sketch";
import useSketch from "../P5Sketch/useSketch";

const Graphs: React.FunctionComponent = () => {
  const { refContainer } = useSketch(Sketch);

  return (
    <div className="container">
      <h1>Graphs</h1>
      <div ref={refContainer} />
    </div>
  );
};

export default Graphs;
