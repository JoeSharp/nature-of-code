import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import P5SketchLibrary from "./components/P5SketchLibrary";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "./components/Jumbotron";
import VectorsDemo from "./components/VectorsDemo";
import Dobble from "./components/Dobble";

const App = () => (
  <Router basename={"/nature-of-code"}>
    <div className="container">
      <Jumbotron />

      <Route
        path={`${process.env.PUBLIC_URL}/sketches`}
        component={P5SketchLibrary}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/vectors`}
        component={VectorsDemo}
      />
      <Route path={`${process.env.PUBLIC_URL}/dobble`} component={Dobble} />
    </div>
  </Router>
);

ReactDOM.render(<Dobble />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
