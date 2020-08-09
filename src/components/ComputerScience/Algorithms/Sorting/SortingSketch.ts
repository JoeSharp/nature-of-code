import p5 from "p5";
import { NO_MATCH } from "comp-sci-maths-lib/dist/algorithms/search/common";
import { AbstractSketch } from "src/components/p5/useSketch";

import {
  SortStage,
  DEFAULT_SORT_STAGE,
  SortStageType,
  SortObservation,
} from "./types";
import DataItemBoid from "src/components/p5/Boid/DataItemBoid";
import { ToString } from "comp-sci-maths-lib/dist/types";

const WIDTH = 600;
const HEIGHT = 600;

const DATA_Y = 100;

interface Config<T> {
  sortStage: SortStage<T>;
  dataToString: ToString<T>;
}

const getDefaultConfig = <T>(): Config<T> => ({
  sortStage: DEFAULT_SORT_STAGE,
  dataToString: (d) => `${d}`,
});

class SortingSketch<T> extends AbstractSketch<Config<T>> {
  boids: {
    [id: string]: DataItemBoid<T>;
  };
  knownPositionVars: string[];

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
    this.knownPositionVars = [];
  }

  reset() {
    this.knownPositionVars = [];
  }

  getPositionVarIndex(positionVar: string): number {
    if (!this.knownPositionVars.includes(positionVar)) {
      this.knownPositionVars.push(positionVar);
    }

    return this.knownPositionVars.indexOf(positionVar);
  }

  getBoid(sketch: p5, vertexToString: ToString<T>, vertex: T) {
    const vAsStr = vertexToString(vertex);
    if (!this.boids[vAsStr]) {
      this.boids[vAsStr] = new DataItemBoid<T>({
        sketch,
        entity: vertex,
        radius: sketch.width / 12,
        minForce: 0,
        maxSpeed: 3,
        position: sketch.createVector(
          sketch.random(0, sketch.width),
          sketch.random(0, sketch.height)
        ),
      });
    }
    return this.boids[vAsStr];
  }

  sketch = (s: p5) => {
    const that = this;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.textFont("Helvetica", 18);
    };

    s.draw = function () {
      const { sortStage = DEFAULT_SORT_STAGE, dataToString } = that.config;

      const { data, stageName, positionVars }: SortObservation<T> =
        sortStage.type === SortStageType.observation
          ? sortStage
          : sortStage.lastObservation;

      const {
        compareIndexA,
        compareValueA,
        compareIndexB,
        compareValueB,
        compareResult,
      } =
        sortStage.type === SortStageType.compare
          ? {
              compareValueA: sortStage.a,
              compareValueB: sortStage.b,
              compareIndexA: sortStage.aIndex,
              compareIndexB: sortStage.bIndex,
              compareResult: sortStage.result,
            }
          : {
              compareValueA: NO_MATCH,
              compareValueB: NO_MATCH,
              compareIndexA: NO_MATCH,
              compareIndexB: NO_MATCH,
              compareResult: 0,
            };

      const { swapFrom, swapTo } =
        sortStage.type === SortStageType.swap
          ? { swapFrom: sortStage.from, swapTo: sortStage.to }
          : {
              swapFrom: NO_MATCH,
              swapTo: NO_MATCH,
            };

      s.background("white");

      // Draw the data
      let dataWidth = s.width / (data.length + 2);
      let getDataX = (i: number) => (i + 1.5) * dataWidth;

      const boids: DataItemBoid<T>[] = data.map((item, i) => {
        const boid = that.getBoid(s, dataToString, item);

        let x = getDataX(i);
        if (i === swapFrom) {
          x = getDataX(swapTo);
        } else if (i === swapTo) {
          x = getDataX(swapFrom);
        }

        boid.arrive(s.createVector(x, DATA_Y), 5);

        return boid;
      });

      s.fill("black");
      s.textAlign(s.LEFT, s.CENTER);

      // Generate the title based on stage information
      let subTitle = "";
      switch (sortStage.type) {
        case SortStageType.compare:
          let comparisonSymbol = "=";
          if (compareResult < 0) {
            comparisonSymbol = "<";
          } else if (compareResult > 0) {
            comparisonSymbol = ">";
          }

          subTitle = `Comparing data[${compareIndexA}]=${compareValueA} ${comparisonSymbol} data[${compareIndexB}]=${compareValueB}`;
          break;
        case SortStageType.swap:
          subTitle = `Swapping Items [${swapFrom}] and [${swapTo}]`;
          break;
      }
      s.text(stageName, 20, 20);
      s.text(subTitle, 20, 50);

      boids.forEach((b) => b.update());
      boids.forEach((b, i) => {
        let colour = "blue";
        switch (i) {
          case compareIndexA:
          case compareIndexB:
            colour = "green";
            break;
          case swapFrom: {
            colour = "red";
            break;
          }
          case swapTo: {
            colour = "red";
            break;
          }
        }
        b.draw(dataToString, { colour });
      });

      // Ensure position vars are in consistent order
      s.textAlign(s.CENTER, s.CENTER);
      s.fill("black");
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
