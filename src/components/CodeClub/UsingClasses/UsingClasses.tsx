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
        In this game I will make a very simple 'player' that can be directed to
        move horizontally using the LEFT and RIGHT arrow keys. We will
        encapsulate this player in a class, and then use a JavaScript object to
        configure the controls for the player.
      </p>
      <p>
        Once the controls can be changed for a given player, we can then make
        multiple players, each with an independant existence in the 'game
        world'.
      </p>
      <p>
        The control scheme is a bit like{" "}
        <Link to="/codeClub/movingWithKeyboard">Moving With Keyboard</Link> but,
        instead of using the event handling functions, we will use isKeyDown
        which we used in
        <Link to="/codeClub/topDownCar">Top Down Car</Link>. So we have a mix of
        approaches.
      </p>
      <p>
        I will only implement LEFT and RIGHT, but you can add UP and DOWN if you
        like. Then try and apply this class based approach to the top down car
        and the steering controls.
      </p>
      <p>
        <a
          target="_blank"
          href="https://editor.p5js.org/JoeSharp/sketches/XqokKbcsP"
        >
          Here is a completed example.
        </a>
      </p>
      <TickableSection tickId="s6step1" header="Step 1 - Create Class">
        <div className="image">
          <img style={{ height: "15rem" }} />
        </div>
      </TickableSection>

      <TickableSection tickId="s6step1" header="Step 1 - Create Class">
        <div className="image">
          <img style={{ height: "15rem" }} />
        </div>
      </TickableSection>
    </div>
  );
};

export default MovingWithKeyboard;
