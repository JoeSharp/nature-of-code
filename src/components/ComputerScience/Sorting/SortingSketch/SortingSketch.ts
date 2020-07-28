import p5 from "p5";
import { AbstractSketch } from "src/components/p5/P5Sketch/useSketch";

import { SortStage, DEFAULT_SORT_STAGE } from "../types";

const WIDTH = 600;
const HEIGHT = 600;

interface Config<T> {
  sortStage: SortStage<T>;
}

const getDefaultConfig = <T>(): Config<T> => ({
  sortStage: DEFAULT_SORT_STAGE,
});

class SortingSketch<T> extends AbstractSketch<Config<T>> {
  knownPositionVars: string[];

  constructor() {
    super(getDefaultConfig());
    this.knownPositionVars = [];
  }

  reset() {
    this.knownPositionVars = [];
  }

  getPositionVarIndex(positionVar: string): number {
    if (!this.knownPositionVars.includes(positionVar)) {
      this.knownPositionVars.push(positionVar);
      console.log("New Position Var", positionVar);
    }

    return this.knownPositionVars.indexOf(positionVar);
  }

  sketch = (s: p5) => {
    const that = this;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.textFont("Helvetica", 18);
    };

    s.draw = function () {
      const {
        sortStage: { data, stageName, positionVars } = DEFAULT_SORT_STAGE,
      } = that.config;

      s.background("white");

      let datyaY = 100;
      let dataWidth = s.width / (data.length + 2);
      let getDataX = (i: number) => (i + 1.5) * dataWidth;

      data.forEach((item, i) => {
        let x = getDataX(i);
        s.fill("blue");
        s.ellipse(x, datyaY, dataWidth, dataWidth);
        s.fill("white");
        s.text(`${item}`, x, datyaY);
      });

      s.fill("black");

      s.textAlign(s.LEFT, s.CENTER);
      s.text(stageName, 20, 20);

      // Ensure position vars are in consistent order

      s.textAlign(s.CENTER, s.CENTER);
      Object.entries(positionVars)
        .map((k) => ({
          key: k[0],
          position: that.getPositionVarIndex(k[0]),
          index: k[1],
        }))
        .forEach(({ key, position, index }) => {
          s.text(`${key}`, getDataX(index), 150 + position * 30);
        });
    };
  };
}

export default SortingSketch;
