import React from "react";

import "../tutorials.css";

import { Link } from "react-router-dom";

import TickableSection from "../TickableSection";

const MovingWithKeyboard: React.FunctionComponent = () => {
  return (
    <div className="tutorial">
      <h1>Using Classes</h1>
      <p>
        We will be learning how to encapsulate our game entities using classes.
      </p>
      <p>
        I have created a blank project that contains comments where the code
        needs to go for each step. This may be useful if you are struggling to
        know where to put things.
      </p>
      <p>
        <a href="https://editor.p5js.org/JoeSharp/sketches/qGRRC5jR0">
          It can be found here
        </a>
      </p>
      <p>
        We will be making a very simple 'game' where we use the arrow keys to
        move UP, DOWN, LEFT and RIGHT, but by wrapping up the player logic in a
        class, we can add a second player using WASD as a control scheme.
      </p>
      <p>
        The control scheme is just like{" "}
        <Link to="/codeClub/movingWithKeyboard">Moving With Keyboard</Link> but,
        instead of using the event handling functions, we will use isKeyDown
        which we used in
        <Link to="/codeClub/topDownCar">Top Down Car</Link>. So we have a mix of
        approaches.
      </p>
      <p>
        <a
          target="_blank"
          href="https://editor.p5js.org/JoeSharp/sketches/UxliLhatH"
        >
          Here is a completed example.
        </a>
      </p>
      <TickableSection tickId="s6step1" header="Step 1 - Create Class">
        <div className="image">
          <img style={{ height: "15rem" }} />
        </div>
      </TickableSection>
    </div>
  );
};

export default MovingWithKeyboard;
