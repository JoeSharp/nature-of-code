import React from "react";

import SketchPicker from "../SketchPicker";
import P5Sketch from "../../p5/P5Sketch";
import sketches from "../sketches";

const P5SketchLibrary: React.FunctionComponent = () => {
  const [sketch, onSketchChange] = React.useState<string | undefined>(
    undefined
  );

  return (
    <div>
      <h1>Sketches</h1>
      <form>
        <div className="form-group">
          <label>Sketch</label>
          <SketchPicker
            sketches={sketches}
            className="form-control"
            value={sketch}
            onChange={onSketchChange}
          />
        </div>
      </form>

      {sketch && <P5Sketch sketch={sketches[sketch]} />}
    </div>
  );
};

export default P5SketchLibrary;
