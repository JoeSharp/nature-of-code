import React from "react";

import SketchPicker from "../SketchPicker";
import P5Sketch from "../../p5/P5Sketch";
import p5 from "p5";

interface Props {
  sketches: { [name: string]: (s: p5) => void };
}

const P5SketchLibrary: React.FunctionComponent<Props> = ({ sketches }) => {
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
