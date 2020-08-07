import { AbstractSketch } from "src/components/p5/useSketch";
import Graph, {
  Edge,
} from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import p5 from "p5";
import { createVector } from "./useGridGraph";
import DataItemBoid from "src/components/p5/Boid/DataItemBoid";
import { ToString } from "comp-sci-maths-lib/dist/types";
import {
  BoidDrawDetailsById,
  BoidDrawDetails,
} from "src/components/p5/Boid/types";

interface Config {
  sourceNode: p5.Vector;
  destinationNode: p5.Vector;
  graph: Graph<p5.Vector>;
  path: p5.Vector[];
  toggleConnection: (vertex: p5.Vector) => void;
}

const getDefaultConfig = (): Config => ({
  graph: new Graph(),
  sourceNode: createVector(0, 0),
  destinationNode: createVector(0, 0),
  path: [],
  toggleConnection: () => {},
});

const WIDTH = 800;
const HEIGHT = 500;
const SPREAD = 50;

const commonDrawDetails: BoidDrawDetails = {
  // includeText: false,
};

class GridSketch extends AbstractSketch<Config> {
  boids: {
    [id: string]: DataItemBoid<p5.Vector>;
  };

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
  }

  getBoid(sketch: p5, vToString: ToString<p5.Vector>, vertex: p5.Vector) {
    const vAsStr = vToString(vertex);
    if (!this.boids[vAsStr]) {
      this.boids[vAsStr] = new DataItemBoid<p5.Vector>({
        sketch,
        entity: vertex,
        radius: 20,
        location: sketch.createVector(
          (vertex.x + 1) * SPREAD,
          (vertex.y + 1) * SPREAD
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
      s.textFont("Helvetica", 10);
      s.textAlign(s.CENTER, s.CENTER);
    };

    s.mouseClicked = function () {
      const mousePosition = s.createVector(s.mouseX, s.mouseY);
      const boid = Object.values(that.boids).find((boid) =>
        boid.isMouseOver(mousePosition)
      );
      if (boid !== undefined) {
        that.config.toggleConnection(boid.entity);
      }
    };

    s.draw = function () {
      s.background(230);
      s.push();

      const {
        graph: { equalityCheck, vertexToString, vertices, edges },
        sourceNode,
        destinationNode,
        path,
      } = that.config;

      let boidsInSketch: DataItemBoid<p5.Vector>[] = vertices.map((v) =>
        that.getBoid(s, vertexToString, v)
      );
      let boidColours: BoidDrawDetailsById = vertices
        .map((v) => {
          let colour;
          if (equalityCheck(v, sourceNode)) {
            colour = "lime";
          } else if (equalityCheck(v, destinationNode)) {
            colour = "red";
          } else if (path.find((p) => equalityCheck(p, v)) !== undefined) {
            colour = "cyan";
          } else {
            colour = "black";
          }
          return { vertex: vertexToString(v), colour };
        })
        .reduce(
          (acc, { vertex, colour }) => ({
            ...acc,
            [vertex]: { colour, ...commonDrawDetails },
          }),
          {}
        );

      const boidIdsInSketch: string[] = vertices.map(vertexToString);

      // Get the list of boid edges
      const boidEdges: Edge<DataItemBoid<p5.Vector>>[] = edges
        .filter(
          ({ from, to }) =>
            boidIdsInSketch.includes(vertexToString(from)) &&
            boidIdsInSketch.includes(vertexToString(to))
        )
        .map(({ from, to, weight }) => ({
          from: that.getBoid(s, vertexToString, from),
          to: that.getBoid(s, vertexToString, to),
          weight,
        }));

      // Draw the lines for all connections
      s.stroke("black");
      s.strokeWeight(4);
      boidEdges.forEach(({ from, to }) => {
        s.line(from.location.x, from.location.y, to.location.x, to.location.y);
      });

      // Draw the lines on our route
      s.stroke("cyan");
      s.strokeWeight(4);
      for (let i = 0; i < path.length - 1; i++) {
        const from = that.getBoid(s, vertexToString, path[i]);
        const to = that.getBoid(s, vertexToString, path[i + 1]);
        s.line(from.location.x, from.location.y, to.location.x, to.location.y);
      }

      /// Call upon all boids to draw themselves
      boidsInSketch.forEach((b) =>
        b.draw(vertexToString, boidColours[vertexToString(b.entity)])
      );
    };
  };
}

export default GridSketch;
