import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { HashRouter as Router, Route } from "react-router-dom";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { page as csPage } from "./components/ComputerScience";
import { page as mathsPage } from "./components/Maths";
import Navigation, { pages } from "./components/Navigation";

import "./index.css";
import Card from "./components/Bootstrap/Card";
import Jumbotron from "./components/Bootstrap/Jumbotron";

const App = () => (
  <Router>
    <div className="container">
      <Navigation />

      {pages.map(({ href, component }) => (
        <Route key={href} path={href} component={component} />
      ))}

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
