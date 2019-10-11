import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import P5SketchLibrary from "./components/P5SketchLibrary";
import AnalogueSignals from "./components/AnalogueSignals";
import { HashRouter as Router, Route } from "react-router-dom";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "./components/Jumbotron";
import Dobble from "./components/Dobble";

const App = () => (
  <Router>
    <div className="container">
      <Jumbotron />

      <Route path={"/sketches"} component={P5SketchLibrary} />
      <Route path={"/analogueSignals"} component={AnalogueSignals} />
      <Route path={"/dobble"} component={Dobble} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
