import p5 from "p5";
import Boid, { BoidArgs } from "src/components/p5/P5Sketch/Boid";

interface BlobBoidArgs<T> extends BoidArgs<T> {
  radius: number;
}

export default class BlobBoid extends Boid<string> {
  radius: number;

  constructor({ radius, ...args }: BlobBoidArgs<string>) {
    super(args);

    this.radius = radius;
  }

  isMouseOver(mousePosition: p5.Vector) {
    let diff = p5.Vector.sub(this.location, mousePosition);
    return diff.mag() < this.radius;
  }

  update() {
    super.update();

    // Clip to Sides
    if (this.location.x > this.sketch.width) {
      this.location.x = this.sketch.width;
    } else if (this.location.x < 0) {
      this.location.x = 0;
    }

    // Clip to top and bottom
    if (this.location.y > this.sketch.height) {
      this.location.y = this.sketch.height;
    } else if (this.location.y < 0) {
      this.location.y = 0;
    }
  }

  draw() {
    this.sketch.fill(this.colour);
    this.sketch.ellipse(this.location.x, this.location.y, this.radius);
    this.sketch.fill("white");
    this.sketch.text(this.entity || "NONE", this.location.x, this.location.y);
  }
}
