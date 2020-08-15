import p5 from "p5";
import { NO_MATCH } from "comp-sci-maths-lib/dist/algorithms/search/common";
import { AbstractSketch } from "src/components/p5/useSketch";

import {
  SearchStage,
  SearchObservation,
  DEFAULT_SEARCH_STAGE,
  SearchStageType,
} from "./types";
import { StringDataItem } from "src/components/p5/Boid/DataItemBoid";

const WIDTH = 600;
const HEIGHT = 600;

interface Config {
  searchItem?: string;
  data: StringDataItem[];
  searchStage: SearchStage<StringDataItem>;
  matchIndex: number;
  isFinalStage: boolean;
}

const getDefaultConfig = <T>(): Config => ({
  searchItem: undefined,
  data: [],
  searchStage: DEFAULT_SEARCH_STAGE,
  matchIndex: NO_MATCH,
  isFinalStage: false,
});

class SearchingSketch<T> extends AbstractSketch<Config> {
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
        searchStage = DEFAULT_SEARCH_STAGE,
        searchItem,
        data,
        matchIndex,
        isFinalStage,
      } = that.config;

      const { stageName, positionVars }: SearchObservation<string> =
        searchStage.type === SearchStageType.observation
          ? searchStage
          : searchStage.lastObservation;

      const { compareIndex, compareResult } =
        searchStage.type === SearchStageType.match
          ? {
              compareIndex: searchStage.index,
              compareResult: searchStage.result,
            }
          : {
              compareIndex: NO_MATCH,
              compareResult: 0,
            };

      s.background("white");

      // Draw the data
      let datyaY = 100;
      let dataWidth = s.width / (data.length + 2);
      let getDataX = (i: number) => (i + 1.5) * dataWidth;

      data.forEach((item, i) => {
        let x = getDataX(i);

        // Work out the fill colour
        switch (i) {
          case compareIndex:
            s.fill("green");
            break;
          case matchIndex:
            if (isFinalStage) {
              s.fill("lime");
            } else {
              s.fill("lightblue");
            }
            break;
          default:
            s.fill("lightblue");
            break;
        }

        // Work out the stroke
        if (Object.values(positionVars).includes(i)) {
          s.strokeWeight(3);
        } else {
          s.strokeWeight(1);
        }

        s.ellipse(x, datyaY, dataWidth, dataWidth);
        s.fill("black");
        s.text(item.value, x, datyaY);
      });

      s.fill("black");

      s.textAlign(s.LEFT, s.CENTER);

      // Generate the title based on stage information
      let subTitle = "";
      switch (searchStage.type) {
        case SearchStageType.match:
          let comparisonSymbol = "=";
          if (compareResult < 0) {
            comparisonSymbol = "<";
          } else if (compareResult > 0) {
            comparisonSymbol = ">";
          }

          subTitle = `Comparing ${searchItem} ${comparisonSymbol} data[${compareIndex}]=${data[compareIndex].value}`;
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

export default SearchingSketch;
