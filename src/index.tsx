import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import P5SketchLibrary from "./components/P5SketchLibrary";
import SolveEquation from "./components/SolveEquation";
import AnalogueSignals from "./components/AnalogueSignals";
import { HashRouter as Router, Route } from "react-router-dom";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "./components/Jumbotron";
import Dobble from "./components/Dobble";
import MidiFun from "./components/MidiFun";
import Graphs from "./components/Graphs";
import PageRank from "./components/PageRank";

const App = () => (
  <Router>
    <div className="container">
      <Jumbotron />

      <Route path={"/midiFun"} component={MidiFun} />
      <Route path={"/solveEquation"} component={SolveEquation} />
      <Route path={"/sketches"} component={P5SketchLibrary} />
      <Route path={"/analogueSignals"} component={AnalogueSignals} />
      <Route path={"/dobble"} component={Dobble} />
      <Route path={"/graphs"} component={Graphs} />
      <Route path={"/pageRank"} component={PageRank} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
