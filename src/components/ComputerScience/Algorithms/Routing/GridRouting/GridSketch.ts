import { AbstractSketch } from "src/components/p5/useSketch";
import Graph, {
  Edge,
} from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import p5 from "p5";
import { createKeyedPoint } from "./useGridGraph";
import DataItemBoid from "src/components/p5/Boid/DataItemBoid";
import { PointDataItem } from "src/components/p5/Boid/types";

interface Config {
  sourceNode: PointDataItem;
  destinationNode: PointDataItem;
  graph: Graph<PointDataItem>;
  path: PointDataItem[];
  toggleConnection: (vertex: PointDataItem) => void;
}

const getDefaultConfig = (): Config => ({
  graph: new Graph(),
  sourceNode: createKeyedPoint(0, 0),
  destinationNode: createKeyedPoint(0, 0),
  path: [],
  toggleConnection: () => {},
});

const WIDTH = 800;
const HEIGHT = 500;
const SPREAD = 50;

class GridSketch extends AbstractSketch<Config> {
  boids: {
    [id: string]: DataItemBoid<PointDataItem>;
  };

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
  }

  getBoid(point: PointDataItem): DataItemBoid<PointDataItem> | undefined {
    return this.boids[point.key];
  }

  getOrCreateBoid(sketch: p5, point: PointDataItem) {
    if (!this.boids[point.key]) {
      this.boids[point.key] = new DataItemBoid<PointDataItem>({
        entity: point,
        label: point.label,
        radius: 20,
        position: sketch.createVector(
          (point.value.x + 1) * SPREAD,
          (point.value.y + 1) * SPREAD
        ),
      });
    }
    return this.boids[point.key];
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
        graph: { equalityCheck, vertices, edges },
        sourceNode,
        destinationNode,
        path,
      } = that.config;

      let boidsInSketch: DataItemBoid<PointDataItem>[] = vertices.map((v) => {
        const boid = that.getOrCreateBoid(s, v);
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

      const boidIdsInSketch: string[] = vertices.map((v) => v.key);

      // Get the list of boid edges
      const boidEdges: Edge<DataItemBoid<PointDataItem>>[] = edges
        .filter(
          ({ from, to }) =>
            boidIdsInSketch.includes(from.key) &&
            boidIdsInSketch.includes(to.key)
        )
        .map(({ from, to, weight }) => ({
          from: that.getOrCreateBoid(s, from),
          to: that.getOrCreateBoid(s, to),
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
        const from = that.getOrCreateBoid(s, path[i]);
        const to = that.getOrCreateBoid(s, path[i + 1]);
        s.line(from.position.x, from.position.y, to.position.x, to.position.y);
      }

      /// Call upon all boids to draw themselves
      boidsInSketch.forEach((b) => b.draw(s));
    };
  };
}

export default GridSketch;
