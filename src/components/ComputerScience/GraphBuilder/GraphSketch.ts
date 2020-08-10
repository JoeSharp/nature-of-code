import p5 from "p5";
import { AbstractSketch } from "src/components/p5/useSketch";
import Graph, {
  Edge,
} from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import DataItemBoid from "../../p5/Boid/DataItemBoid";
import { defaultToString } from "comp-sci-maths-lib/dist/common";
import { GraphSketchConfig } from "./types";
import { createVector } from "../Algorithms/Routing/GridRouting/useGridGraph";

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

  colours: {
    [id: string]: string;
  };
  borderWeights: {
    [id: string]: number;
  };

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
    this.colours = {};
    this.borderWeights = {};
  }

  setColour(vertex: T, colour: string) {
    this.colours[this.config.getKey(vertex)] = colour;
  }

  setBorderWeight(vertex: T, borderWeight: number) {
    this.borderWeights[this.config.getKey(vertex)] = borderWeight;
  }

  getBoid(vertex: T): DataItemBoid<T> | undefined {
    return this.boids[this.config.getKey(vertex)];
  }

  getOrCreateBoid(s: p5, vertex: T): DataItemBoid<T> {
    const vAsStr = this.config.getKey(vertex);
    if (!this.boids[vAsStr]) {
      this.boids[vAsStr] = new DataItemBoid<T>({
        entity: vertex,
        label: vAsStr,
        radius: !!s ? s.width / 12 : 5,
        colour: this.colours[vAsStr] || "red",
        borderWeight: this.borderWeights[vAsStr] || 1,
        position: !!s
          ? s.createVector(s.random(0, s.width), s.random(0, s.height))
          : createVector(0, 0),
      });
    } else {
      this.boids[vAsStr].colour = this.colours[vAsStr] || "red";
      this.boids[vAsStr].borderWeight = this.borderWeights[vAsStr] || 1;
    }
    this.boids[vAsStr].entity = vertex;
    return this.boids[vAsStr];
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
        getKey,
        graph: { vertices, edges },
        physicsEnabled,
      } = that.config;

      // Get the list of boids in this sketch based on the vertex IDs
      const boidsInSketch: DataItemBoid<T>[] = vertices.map((v) =>
        that.getOrCreateBoid(s, v)
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
          from: that.getOrCreateBoid(s, from),
          to: that.getOrCreateBoid(s, to),
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
        boidsInSketch.forEach((b) => b.update(s));
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
      boidsInSketch.forEach((b) => b.draw(s));
    };
  };
}

export default GraphSketch;
