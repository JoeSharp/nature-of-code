import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import P5SketchLibrary from "./components/Experiments/P5SketchLibrary";
import SolveEquation from "./components/Experiments/SolveEquation";
import AnalogueSignals from "./components/Experiments/AnalogueSignals";
import { HashRouter as Router, Route } from "react-router-dom";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MovingWithKeyboard from "./components/CodeClub/MovingWithKeyboard";
import Navigation from "./components/Navigation";
import Asteroids from "./components/Experiments/Asteroids";
import Dobble from "./components/Experiments/Dobble";
import MidiFun from "./components/Experiments/MidiFun";
import Graphs from "./components/Experiments/Graphs";
import PageRank from "./components/Experiments/PageRank";

const App = () => (
  <Router>
    <div className="container">
      <Navigation />

      <Route
        path={"/codeClub/movingWithKeyboard"}
        component={MovingWithKeyboard}
      />

      <Route path={"/experiments/asteroids"} component={Asteroids} />
      <Route path={"/experiments/midiFun"} component={MidiFun} />
      <Route path={"/experiments/solveEquation"} component={SolveEquation} />
      <Route path={"/experiments/sketches"} component={P5SketchLibrary} />
      <Route
        path={"/experiments/analogueSignals"}
        component={AnalogueSignals}
      />
      <Route path={"/experiments/dobble"} component={Dobble} />
      <Route path={"/experiments/graphs"} component={Graphs} />
      <Route path={"/experiments/pageRank"} component={PageRank} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
