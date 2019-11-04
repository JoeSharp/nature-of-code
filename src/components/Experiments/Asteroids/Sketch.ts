import p5 from "p5";
import { AbstractSketch } from "../P5Sketch/useSketch";

interface Config {}

const defaultConfig: Config = {};

class Sketch extends AbstractSketch<Config> {
  constructor() {
    super(defaultConfig);
  }

  sketch = (s: p5) => {
    const that = this;

    s.setup = function() {
      const {} = that.config;
    };

    s.draw = function() {};
  };
}

export default Sketch;
