import p5 from "p5";
import { AbstractSketch } from "src/components/p5/useSketch";
import Graph, { Edge } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";
import BlobBoid from "./BlobBoid";

const WIDTH = 480;
const HEIGHT = 320;

const MAX_SPEED = 1.5;
const MAX_FORCE = 0.5;
// const RADIUS = 30;

interface BlobBoids {
  [id: string]: BlobBoid;
}

interface Config<T> {
  graph: Graph<T>;
  getKey: (vertex: T) => string;
}

const getDefaultConfig = (): Config<any> => ({
  graph: new Graph(),
  getKey: (v) => `${v}`,
});

class GraphSketch<T> extends AbstractSketch<Config<T>> {
  boids: BlobBoids;

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
  }

  getBoid(sketch: p5, id: string) {
    if (!this.boids[id]) {
      this.boids[id] = new BlobBoid({
        sketch,
        entity: id,
        radius: sketch.width / 12,
        colour: "red",
        maxForce: MAX_FORCE,
        maxSpeed: MAX_SPEED,
        location: sketch.createVector(
          sketch.random(0, sketch.width),
          sketch.random(0, sketch.height)
        ),
      });
    }
    return this.boids[id];
  }

  sketch = (s: p5) => {
    const that = this;
    let screenCentre: p5.Vector;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.textFont("Helvetica", 24);
      s.textAlign(s.CENTER, s.CENTER);
      screenCentre = s.createVector(s.width / 2, s.height / 2);
    };

    s.mousePressed = function () {
      const mousePosition = s.createVector(s.mouseX, s.mouseY);
      const boid = Object.values(that.boids).find((boid) =>
        boid.isMouseOver(mousePosition)
      );
      if (boid !== undefined) {
        boid.grab();
      }
    };

    s.mouseDragged = function () {
      const mousePosition = s.createVector(s.mouseX, s.mouseY);
      Object.values(that.boids).forEach((boid) => boid.dragged(mousePosition));
    };

    s.mouseReleased = function () {
      Object.values(that.boids).forEach((boid) => boid.releaseGrab());
    };

    s.draw = function () {
      s.background(230);
      s.fill("blue");

      const {
        graph: { vertices, edges },
        getKey,
      } = that.config;

      // Get the list of boids in this sketch based on the vertex IDs
      const boidsInSketch: BlobBoid[] = vertices
        .map(getKey)
        .map((v) => that.getBoid(s, v));
      const boidIdsInSketch: string[] = vertices.map(getKey);

      // Get the list of boid edges
      const boidEdges: Edge<BlobBoid>[] = edges
        .map(({ from, to, weight }) => ({
          from: getKey(from),
          to: getKey(to),
          weight,
        }))
        .filter(
          ({ from, to }) =>
            boidIdsInSketch.includes(from) && boidIdsInSketch.includes(to)
        )
        .map(({ from, to, weight }) => ({
          from: that.getBoid(s, from),
          to: that.getBoid(s, to),
          weight,
        }));

      // Attract the first boid to the centre
      if (boidsInSketch.length > 0) {
        boidsInSketch[0].arrive(screenCentre, s.width / 4);
      }

      // They should all repel each other
      boidsInSketch.forEach((ba, ia) => {
        boidsInSketch
          .filter((bb, ib) => ia !== ib)
          .forEach((bb) => ba.flee(bb.location, s.width / 4));
      });

      // Apply force of a spring between connected boids
      boidEdges.forEach(({ from, to }) => {
        from.spring(to.location, s.width / 8, s.width / 32);
        to.spring(from.location, s.width / 8, s.width / 32);
      });

      // Draw the lines
      boidEdges.forEach(({ from, to }) => {
        s.line(from.location.x, from.location.y, to.location.x, to.location.y);
      });

      // Call upon all boids to update themselves
      boidsInSketch.forEach((b) => b.update());

      /// Call upon all boids to draw themselves
      boidsInSketch.forEach((b) => b.draw());
    };
  };
}

export default GraphSketch;
