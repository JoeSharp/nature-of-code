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

  update() {
    if (!this.grabbed) {
      super.update();
    }
    // otherwise we are holding onto the boid
  }

  isMouseOver(mousePosition: p5.Vector) {
    let diff = p5.Vector.sub(this.location, mousePosition);
    return diff.mag() < this.radius;
  }

  draw() {
    this.sketch.fill(this.colour);
    this.sketch.ellipse(this.location.x, this.location.y, this.radius);
    this.sketch.fill("white");
    this.sketch.text(this.entity || "NONE", this.location.x, this.location.y);
  }
}
