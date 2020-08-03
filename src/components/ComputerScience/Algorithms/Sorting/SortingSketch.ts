import p5 from "p5";
import { NO_MATCH } from "ocr-cs-alevel-ts/dist/algorithms/search/common";
import { AbstractSketch } from "src/components/p5/P5Sketch/useSketch";

import {
  SortStage,
  DEFAULT_SORT_STAGE,
  SortStageType,
  SortObservation,
} from "./types";

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

  // keep track for animation
  swappingFrom: number = NO_MATCH;
  swappingTo: number = NO_MATCH;
  swappingProgress: number = 0;

  constructor() {
    super(getDefaultConfig());
    this.knownPositionVars = [];
  }

  reset() {
    this.knownPositionVars = [];
    this.swappingFrom = NO_MATCH;
    this.swappingTo = NO_MATCH;
  }

  getPositionVarIndex(positionVar: string): number {
    if (!this.knownPositionVars.includes(positionVar)) {
      this.knownPositionVars.push(positionVar);
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
      const { sortStage = DEFAULT_SORT_STAGE } = that.config;

      const { data, stageName, positionVars }: SortObservation<string> =
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

      // Are we animating a swap?
      if (sortStage.type === SortStageType.swap) {
        if (that.swappingProgress < 1.0) {
          that.swappingProgress += 0.05;
        }

        // Check to see if swapping has changed
        if (swapFrom !== that.swappingFrom || swapTo !== that.swappingTo) {
          that.swappingProgress = 0.0;
        }

        // Keep track of the swap we are watching
        that.swappingFrom = swapFrom;
        that.swappingTo = swapTo;
      } else {
        that.swappingProgress = 0.0;
      }

      s.background("white");

      // Draw the data
      let datyaY = 100;
      let dataWidth = s.width / (data.length + 2);
      let getDataX = (i: number) => (i + 1.5) * dataWidth;

      data.forEach((item, i) => {
        let x = getDataX(i);
        switch (i) {
          case compareIndexA:
          case compareIndexB:
            s.fill("green");
            break;
          case swapFrom: {
            let xTo = getDataX(swapTo);
            x += (xTo - x) * that.swappingProgress;
            s.fill("red");
            break;
          }
          case swapTo: {
            let xFrom = getDataX(swapFrom);
            x += (xFrom - x) * that.swappingProgress;
            s.fill("red");
            break;
          }
          default:
            s.fill("blue");
            break;
        }

        s.ellipse(x, datyaY, dataWidth, dataWidth);
        s.fill("white");
        s.text(`${item}`, x, datyaY);
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
