import p5 from "p5";
import { AbstractSketch } from "src/components/p5/useSketch";
import { BigOMeasurements } from "./types";

const WIDTH = 600;
const HEIGHT = 600;

interface Config {
  startSize: number;
  endSize: number;
  measurements: BigOMeasurements;
}

const getDefaultConfig = <T>(): Config => ({
  startSize: 100,
  endSize: 1000,
  measurements: {},
});

class BigOSketch<T> extends AbstractSketch<Config> {
  constructor() {
    super(getDefaultConfig());
  }

  sketch(s: p5) {
    const that = this;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.textFont("Helvetica", 18);
    };

    s.draw = function () {
      const { measurements, startSize, endSize } = that.config;

      s.background(230);
      s.strokeWeight(5);
      s.stroke("blue");

      // Find the largest measurement
      let highest = 0;
      Object.values(measurements).forEach((c: number[]) =>
        c.forEach((i) => {
          if (i > highest) {
            highest = i;
          }
        })
      );

      Object.entries(measurements)
        .map((k) => ({ index: parseInt(k[0]), counts: k[1] }))
        .forEach(({ index, counts }) => {
          const x = s.map(index, startSize, endSize, 0, WIDTH);

          counts.forEach((c: number) => {
            const y = s.map(c, 0, highest, 0, HEIGHT);
            s.point(x, HEIGHT - y);
          });
        });
    };
  }
}

export default BigOSketch;
