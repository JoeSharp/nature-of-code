import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "./components/Jumbotron";
import P5SketchLibrary from "./components/P5SketchLibrary";
import VectorsDemo from "./components/VectorsDemo";

const App = () => (
  <Router>
    <Jumbotron />
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sketches">Sketches</Link>
        </li>
        <li>
          <Link to="/vectors">Vectors</Link>
        </li>
      </ul>
    </nav>
    <Route path="/sketches" exact component={P5SketchLibrary} />
    <Route path="/vectors" exact component={VectorsDemo} />
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
