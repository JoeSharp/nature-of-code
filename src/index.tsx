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
import { page as csPage, pages as csPages } from "./components/ComputerScience";
import { page as mathsPage, pages as mathsPages } from "./components/Maths";
import Navigation from "./components/Navigation";

import "./index.css";
import Card from "./components/General/Card";
import Jumbotron from "./components/General/Jumbotron";

const App = () => (
  <Router>
    <div className="container">
      <Navigation />

      {[...codeClubSessions, ...experiments, ...csPages, ...mathsPages].map(
        ({ href, component }) => (
          <Route key={href} path={href} component={component} />
        )
      )}

      <Route
        path="/"
        exact
        component={() => {
          return (
            <React.Fragment>
              <Jumbotron
                title="Computer Science and Maths"
                lead="This site contains interactive demonstrations of various
                    algorithms and data structures used in Maths and Computer
                    Science up to A Level."
              />

              <div className="row">
                <div className="col-sm-6">
                  <Card {...csPage} />
                </div>
                <div className="col-sm-6">
                  <Card {...mathsPage} />
                </div>
              </div>
            </React.Fragment>
          );
        }}
      />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
