import * as React from "react";
// import { Link } from "react-router-dom";

export default () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">
      Joe's Experiments
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="/">
            Home <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="sketches">
            Sketches
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="vectors">
            Vectors
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="dobble">
            Dobble
          </a>
        </li>
      </ul>
    </div>
  </nav>
);
