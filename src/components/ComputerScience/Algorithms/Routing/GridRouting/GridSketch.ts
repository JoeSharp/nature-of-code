import { AbstractSketch } from "src/components/p5/useSketch";
import Graph, {
  Edge,
} from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import p5 from "p5";
import { createVector } from "./useGridGraph";
import DataItemBoid from "src/components/p5/Boid/DataItemBoid";
import { ToString } from "comp-sci-maths-lib/dist/types";

interface Config {
  sourceNode: p5.Vector;
  destinationNode: p5.Vector;
  graph: Graph<p5.Vector>;
  path: p5.Vector[];
  getKey: (item: p5.Vector) => string;
  toggleConnection: (vertex: p5.Vector) => void;
}

const getDefaultConfig = (): Config => ({
  graph: new Graph(),
  sourceNode: createVector(0, 0),
  destinationNode: createVector(0, 0),
  path: [],
  getKey: (v) => `${v.x}-${v.y}`,
  toggleConnection: () => {},
});

const WIDTH = 800;
const HEIGHT = 500;
const SPREAD = 50;

class GridSketch extends AbstractSketch<Config> {
  boids: {
    [id: string]: DataItemBoid<p5.Vector>;
  };

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
  }

  getBoid(vertex: p5.Vector): DataItemBoid<p5.Vector> | undefined {
    return this.boids[this.config.getKey(vertex)];
  }

  getOrCreateBoid(
    sketch: p5,
    vToString: ToString<p5.Vector>,
    vertex: p5.Vector
  ) {
    const vAsStr = vToString(vertex);
    if (!this.boids[vAsStr]) {
      this.boids[vAsStr] = new DataItemBoid<p5.Vector>({
        entity: vertex,
        label: vAsStr,
        radius: 20,
        position: sketch.createVector(
          (vertex.x + 1) * SPREAD,
          (vertex.y + 1) * SPREAD
        ),
      });
    }
    this.boids[vAsStr].entity = vertex;
    this.boids[vAsStr].label = vAsStr;
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

      let boidsInSketch: DataItemBoid<p5.Vector>[] = vertices.map((v) => {
        const boid = that.getOrCreateBoid(s, vertexToString, v);
        if (equalityCheck(v, sourceNode)) {
          boid.colour = "lime";
        } else if (equalityCheck(v, destinationNode)) {
          boid.colour = "red";
        } else if (path.find((p) => equalityCheck(p, v)) !== undefined) {
          boid.colour = "cyan";
        } else {
          boid.colour = "black";
        }
        return boid;
      });

      const boidIdsInSketch: string[] = vertices.map(vertexToString);

      // Get the list of boid edges
      const boidEdges: Edge<DataItemBoid<p5.Vector>>[] = edges
        .filter(
          ({ from, to }) =>
            boidIdsInSketch.includes(vertexToString(from)) &&
            boidIdsInSketch.includes(vertexToString(to))
        )
        .map(({ from, to, weight }) => ({
          from: that.getOrCreateBoid(s, vertexToString, from),
          to: that.getOrCreateBoid(s, vertexToString, to),
          weight,
        }));

      // Draw the lines for all connections
      s.stroke("black");
      s.strokeWeight(4);
      boidEdges.forEach(({ from, to }) => {
        s.line(from.position.x, from.position.y, to.position.x, to.position.y);
      });

      // Draw the lines on our route
      s.stroke("cyan");
      s.strokeWeight(4);
      for (let i = 0; i < path.length - 1; i++) {
        const from = that.getOrCreateBoid(s, vertexToString, path[i]);
        const to = that.getOrCreateBoid(s, vertexToString, path[i + 1]);
        s.line(from.position.x, from.position.y, to.position.x, to.position.y);
      }

      /// Call upon all boids to draw themselves
      boidsInSketch.forEach((b) => b.draw(s));
    };
  };
}

export default GridSketch;
