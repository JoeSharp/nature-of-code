import p5 from "p5";
import { AbstractSketch } from "src/components/p5/P5Sketch/useSketch";

import { SortStage, DEFAULT_SORT_STAGE } from "../types";

const WIDTH = 600;
const HEIGHT = 300;

interface Config<T> {
  sortStage: SortStage<T>;
}

const getDefaultConfig = <T>(): Config<T> => ({
  sortStage: DEFAULT_SORT_STAGE,
});

class SortingSketch<T> extends AbstractSketch<Config<T>> {
  constructor() {
    super(getDefaultConfig());
  }

  sketch = (s: p5) => {
    const that = this;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
    };

    s.draw = function () {
      const {
        sortStage: { data, stageName, positionVars } = DEFAULT_SORT_STAGE,
      } = that.config;

      s.background("white");

      let y = HEIGHT / 2;

      data.forEach((item, i) => {
        let x = (i + 1) * 80;
        s.fill("blue");
        s.ellipse(x, y, 70, 70);
        s.fill("white");
        s.text(`${item}`, x, y);
      });

      s.fill("black");

      s.textAlign(s.LEFT, s.CENTER);
      s.text(stageName, 20, 20);

      s.textAlign(s.CENTER, s.CENTER);
      Object.entries(positionVars)
        .map((k) => ({ key: k[0], value: k[1] }))
        .forEach(({ key, value }, i) => {
          s.text(`${key}=${value}`, 50, (i + 3) * 20);
        });
    };
  };
}

export default SortingSketch;
