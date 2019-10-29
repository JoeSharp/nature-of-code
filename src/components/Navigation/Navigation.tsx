import * as React from "react";
import { Link } from "react-router-dom";

export default () => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link className="nav-link active" to="/">
        Joe's Experiments
      </Link>
    </li>
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        data-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Experiments
      </a>
      <div className="dropdown-menu">
        <Link className="dropdown-item" to="/experiments/pageRank">
          Page Rank
        </Link>
        <Link className="dropdown-item" to="/experiments/midiFun">
          MIDI Fun
        </Link>
        <Link className="dropdown-item" to="/experiments/solveEquation">
          Solve Equations
        </Link>
        <Link className="dropdown-item" to="/experiments/sketches">
          Sketches
        </Link>
        <Link className="dropdown-item" to="/experiments/analogueSignals">
          Analogue Signals
        </Link>
        <Link className="dropdown-item" to="/experiments/dobble">
          Dobble
        </Link>
        <Link className="dropdown-item" to="/experiments/graphs">
          Graphs
        </Link>
      </div>
    </li>
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        data-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Code Club
      </a>
      <div className="dropdown-menu">
        <Link className="dropdown-item" to="/codeClub/movingWithKeyboard">
          Moving With Keyboard
        </Link>
      </div>
    </li>
  </ul>
);
