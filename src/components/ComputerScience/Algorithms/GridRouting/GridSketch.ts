import { AbstractSketch } from "src/components/p5/useSketch";
import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";
import p5 from "p5";
import { createVector } from "./useGridGraph";

interface Config {
  sourceNode: p5.Vector;
  destinationNode: p5.Vector;
  graph: Graph<p5.Vector>;
  path: p5.Vector[];
}

const getDefaultConfig = (): Config => ({
  graph: new Graph(),
  sourceNode: createVector(0, 0),
  destinationNode: createVector(0, 0),
  path: [],
});

const WIDTH = 800;
const HEIGHT = 500;
const SPREAD = 50;

class GridSketch extends AbstractSketch<Config> {
  constructor() {
    super(getDefaultConfig());
  }

  sketch = (s: p5) => {
    const that = this;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.textFont("Helvetica", 24);
      s.textAlign(s.CENTER, s.CENTER);
    };

    s.draw = function () {
      s.background(230);
      s.push();
      s.translate(SPREAD, SPREAD);

      const {
        graph: { equalityCheck, vertices, edges },
        sourceNode,
        destinationNode,
        path,
      } = that.config;

      // Draw Edges
      s.strokeWeight(1);
      s.stroke("black");
      edges.forEach(({ from, to }) => {
        s.line(from.x * SPREAD, from.y * SPREAD, to.x * SPREAD, to.y * SPREAD);
      });

      // Draw Vertices
      s.strokeWeight(20);
      vertices.forEach((v) => {
        if (equalityCheck(v, sourceNode)) {
          s.stroke("blue");
        } else if (equalityCheck(v, destinationNode)) {
          s.stroke("red");
        } else if (path.find((p) => equalityCheck(p, v)) !== undefined) {
          s.stroke("green");
        } else {
          s.stroke("black");
        }
        s.point(v.x * SPREAD, v.y * SPREAD);
      });

      // Undo translate
      s.pop();
    };
  };
}

export default GridSketch;
