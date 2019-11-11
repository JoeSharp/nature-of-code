import * as React from "react";

import "../tutorials.css";

import TickableSection from "../TickableSection";

const TopDownCar: React.FunctionComponent = () => {
  return (
    <div className="tutorial">
      <h1>Moving With Keyboard</h1>
      <p>
        In this example we will be using vectors to control rotation and
        position of our game object.
      </p>
      <p>
        <a
          target="_blank"
          href="https://editor.p5js.org/JoeSharp/sketches/9gcY5Y4D7"
        >
          Here is a completed example.
        </a>
      </p>
      <TickableSection
        tickId="s3Step1"
        header="Step 1 - Create Variables"
      ></TickableSection>
    </div>
  );
};

export default TopDownCar;
