import p5 from "p5";
import Boid from "./Boid";
import { BoidDrawDetails } from "./types";
import { ToString } from "comp-sci-maths-lib/dist/types";

export default class DataItemBoid<T> extends Boid<T> {
  isMouseOver(mousePosition: p5.Vector) {
    // Is the mouse pointer within the radius of our boid circle?
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

  draw(
    toString: ToString<T>,
    { colour = "red", borderWeight = 1, includeText = true }: BoidDrawDetails
  ) {
    this.sketch.stroke("black");
    if (this.grabbed) {
      this.sketch.strokeWeight(4);
    } else {
      this.sketch.strokeWeight(borderWeight);
    }

    this.sketch.fill(colour);
    this.sketch.ellipse(this.location.x, this.location.y, this.radius);

    if (includeText) {
      this.sketch.fill("white");
      this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
      this.sketch.text(toString(this.entity), this.location.x, this.location.y);
    }
  }
}
