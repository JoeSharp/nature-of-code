import * as React from "react";
import { useState } from "react";

import SketchPicker from "../SketchPicker";
import P5Sketch from "../P5Sketch/P5Sketch";
import sketches from "../../sketches";

export default () => {
  const [sketch, onSketchChange] = useState<string | undefined>(undefined);

  return (
    <div>
      <form>
        <label>Sketch</label>
        <SketchPicker value={sketch} onChange={onSketchChange} />
      </form>

      {sketch && <P5Sketch sketch={sketches[sketch]} />}
    </div>
  );
};
