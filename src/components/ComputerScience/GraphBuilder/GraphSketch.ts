import p5 from "p5";
import { AbstractSketch } from "src/components/p5/useSketch";
import Graph, {
  Edge,
} from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import DataItemBoid from "../../p5/Boid/DataItemBoid";
import { defaultToString } from "comp-sci-maths-lib/dist/common";
import { GraphSketchConfig } from "./types";

const WIDTH = 800;
const HEIGHT = 500;

const getDefaultConfig = (): GraphSketchConfig<any> => ({
  graph: new Graph(),
  physicsEnabled: true,
  getKey: defaultToString,
});

class GraphSketch<T> extends AbstractSketch<GraphSketchConfig<T>> {
  boids: {
    [id: string]: DataItemBoid<T>;
  };

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
  }

  getBoid(vertex: T): DataItemBoid<T> {
    const sketch = this.s;
    if (sketch === undefined) {
      throw new Error("Sketch Undefined when Getting Boid");
    }
    const vAsStr = this.config.getKey(vertex);
    if (!this.boids[vAsStr]) {
      this.boids[vAsStr] = new DataItemBoid<T>({
        sketch,
        entity: vertex,
        label: vAsStr,
        radius: sketch.width / 12,
        colour: "red",
        borderWeight: 1,
        position: sketch.createVector(
          sketch.random(0, sketch.width),
          sketch.random(0, sketch.height)
        ),
      });
    }
    this.boids[vAsStr].entity = vertex;
    return this.boids[vAsStr];
  }

  sketch = (s: p5) => {
    const that = this;
    that.s = s;
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
        getKey,
        graph: { vertices, edges },
        physicsEnabled,
      } = that.config;

      // Get the list of boids in this sketch based on the vertex IDs
      const boidsInSketch: DataItemBoid<T>[] = vertices.map((v) =>
        that.getBoid(v)
      );
      const boidIdsInSketch: string[] = vertices.map(getKey);

      // Get the list of boid edges
      const boidEdges: Edge<DataItemBoid<T>>[] = edges
        .filter(
          ({ from, to }) =>
            boidIdsInSketch.includes(getKey(from)) &&
            boidIdsInSketch.includes(getKey(to))
        )
        .map(({ from, to, weight }) => ({
          from: that.getBoid(from),
          to: that.getBoid(to),
          weight,
        }));

      if (physicsEnabled) {
        // Attract any boids that are very near the edge to the centre
        boidsInSketch
          .filter(({ position: { x, y } }) => {
            return (
              x < s.width / 8 ||
              x > (s.width * 7) / 8 ||
              y < s.height / 8 ||
              y > (s.height * 7) / 8
            );
          })
          .forEach((b) => b.seek(screenCentre));

        // They should all repel each other
        boidsInSketch.forEach((ba, ia) => {
          boidsInSketch
            .filter((_, ib) => ia !== ib)
            .forEach((bb) => ba.flee(bb.position, s.width / 4));
        });

        // Apply force of a spring between connected boids
        boidEdges.forEach(({ from, to }) => {
          from.spring(to.position, s.width / 8, s.width / 32);
          to.spring(from.position, s.width / 8, s.width / 32);
        });

        // Call upon all boids to update themselves
        boidsInSketch.forEach((b) => b.update());
      }

      // Draw the lines
      boidEdges.forEach(({ from, to, weight }) => {
        s.strokeWeight(4);
        s.line(from.position.x, from.position.y, to.position.x, to.position.y);
        let midpoint: p5.Vector = (p5.Vector.lerp(
          from.position,
          to.position,
          0.5
        ) as unknown) as p5.Vector; // error in p5 type definition

        s.fill("white");
        s.circle(midpoint.x, midpoint.y, 30);
        s.fill("black");
        s.strokeWeight(1);
        s.textAlign(s.CENTER, s.CENTER);
        s.text(`${weight}`, midpoint.x, midpoint.y);
      });

      /// Call upon all boids to draw themselves
      boidsInSketch.forEach((b) => b.draw());
    };
  };
}

export default GraphSketch;
