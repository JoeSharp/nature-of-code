import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
<<<<<<< HEAD
import P5SketchLibrary from "./components/P5SketchLibrary";
=======
>>>>>>> 4b86a8a393e984b4e0ccb39f6701b063a1ff509c
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
<<<<<<< HEAD
    <P5SketchLibrary />
=======
>>>>>>> 4b86a8a393e984b4e0ccb39f6701b063a1ff509c
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
<<<<<<< HEAD
          <Link to="/sketches/">Sketches</Link>
        </li>
      </ul>
    </nav>
  </div>
=======
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
>>>>>>> 4b86a8a393e984b4e0ccb39f6701b063a1ff509c
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
