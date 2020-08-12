import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import {
  HashRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation, { pages } from "./components/Navigation";

import "./index.css";

const App = () => (
  <Router>
    <div className="container">
      <Route
        component={({ history: { location } }: RouteComponentProps) => (
          <Navigation location={location.pathname} />
        )}
      />

      {pages.map(({ href, component }) => (
        <Route key={href} exact path={href} component={component} />
      ))}
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
