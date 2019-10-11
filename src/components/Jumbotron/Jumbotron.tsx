import * as React from "react";
import { Link } from "react-router-dom";

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
          <Link className="nav-link" to={`${process.env.PUBLIC_URL}/`}>
            Home <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="sketches">
            Sketches
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/vectors">
            Vectors
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dobble">
            Dobble
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);
