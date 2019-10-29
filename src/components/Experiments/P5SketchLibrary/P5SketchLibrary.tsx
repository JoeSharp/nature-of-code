import * as React from "react";
import { useState } from "react";

import SketchPicker from "../SketchPicker";
import P5Sketch from "../P5Sketch/P5Sketch";
import sketches from "../../../sketches";

export default () => {
  const [sketch, onSketchChange] = useState<string | undefined>(undefined);

  return (
    <div>
      <h1>Sketches</h1>
      <form>
        <div className="form-group">
          <label>Sketch</label>
          <SketchPicker
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
