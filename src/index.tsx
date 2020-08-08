import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { HashRouter as Router, Route } from "react-router-dom";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import codeClubSessions from "./components/CodeClub";
import experiments from "./components/Experiments";
import computerScience from "./components/ComputerScience";
import maths from "./components/Maths";
import Navigation from "./components/Navigation";

import "./index.css";

const App = () => (
  <Router>
    <div className="container">
      <Navigation />

      {[...codeClubSessions, ...experiments, ...computerScience, ...maths].map(
        ({ href, component }) => (
          <Route key={href} path={href} component={component} />
        )
      )}
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
