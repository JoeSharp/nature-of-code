import p5 from "p5";
import { AbstractSketch } from "src/components/p5/useSketch";
import Graph, { Edge } from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";
import DataItemBoid from "../../p5/Boid/DataItemBoid";
import {
  BoidDrawDetailsById,
  BoidDrawDetails,
} from "src/components/p5/Boid/types";

const WIDTH = 800;
const HEIGHT = 500;

interface Config<T> {
  graph: Graph<T>;
  getKey: (vertex: T) => string;
  physicsEnabled: boolean;
  drawDetails: BoidDrawDetailsById;
}

const getDefaultConfig = (): Config<any> => ({
  graph: new Graph(),
  getKey: (v) => `${v}`,
  physicsEnabled: true,
  drawDetails: {},
});

class GraphSketch<T> extends AbstractSketch<Config<T>> {
  boids: {
    [id: string]: DataItemBoid;
  };

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
  }

  getBoidDrawDetails(id: string): BoidDrawDetails {
    return {
      colour: "red",
      borderWeight: 1,
      ...this.config.drawDetails[id],
    };
  }

  getBoid(sketch: p5, id: string) {
    if (!this.boids[id]) {
      this.boids[id] = new DataItemBoid({
        sketch,
        entity: id,
        radius: sketch.width / 12,
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
        physicsEnabled,
      } = that.config;

      // Get the list of boids in this sketch based on the vertex IDs
      const boidsInSketch: DataItemBoid[] = vertices
        .map(getKey)
        .map((v) => that.getBoid(s, v));
      const boidIdsInSketch: string[] = vertices.map(getKey);

      // Get the list of boid edges
      const boidEdges: Edge<DataItemBoid>[] = edges
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

      if (physicsEnabled) {
        // Attract any boids that are very near the edge to the centre
        boidsInSketch
          .filter(({ location: { x, y } }) => {
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
            .forEach((bb) => ba.flee(bb.location, s.width / 4));
        });

        // Apply force of a spring between connected boids
        boidEdges.forEach(({ from, to }) => {
          from.spring(to.location, s.width / 8, s.width / 32);
          to.spring(from.location, s.width / 8, s.width / 32);
        });

        // Call upon all boids to update themselves
        boidsInSketch.forEach((b) => b.update());
      }

      // Draw the lines
      s.strokeWeight(4);
      boidEdges.forEach(({ from, to, weight }) => {
        s.line(from.location.x, from.location.y, to.location.x, to.location.y);
        let midpoint: p5.Vector = (p5.Vector.lerp(
          from.location,
          to.location,
          0.5
        ) as unknown) as p5.Vector; // error in p5 type definition

        s.fill("white");
        s.circle(midpoint.x, midpoint.y, 30);
        s.fill("black");
        s.textAlign(s.CENTER, s.CENTER);
        s.text(`${weight}`, midpoint.x, midpoint.y);
      });

      /// Call upon all boids to draw themselves
      boidsInSketch.forEach((b) => b.draw(that.getBoidDrawDetails(b.entity)));
    };
  };
}

export default GraphSketch;
