import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import P5SketchLibrary from "./components/P5SketchLibrary";

ReactDOM.render(<P5SketchLibrary />, document.getElementById(
  "root"
) as HTMLElement);
registerServiceWorker();
