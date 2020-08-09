import p5 from "p5";
import Boid from "./Boid";
import { BoidDrawDetails } from "./types";
import { ToString } from "comp-sci-maths-lib/dist/types";

export default class DataItemBoid<T> extends Boid<T> {
  isMouseOver(mousePosition: p5.Vector) {
    // Is the mouse pointer within the radius of our boid circle?
    let diff = p5.Vector.sub(this.position, mousePosition);
    return diff.mag() < this.radius;
  }

  update() {
    super.update();

    // Clip to Sides
    if (this.position.x > this.sketch.width) {
      this.position.x = this.sketch.width;
    } else if (this.position.x < 0) {
      this.position.x = 0;
    }

    // Clip to top and bottom
    if (this.position.y > this.sketch.height) {
      this.position.y = this.sketch.height;
    } else if (this.position.y < 0) {
      this.position.y = 0;
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
    this.sketch.ellipse(this.position.x, this.position.y, this.radius);

    if (includeText) {
      this.sketch.fill("white");
      this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
      this.sketch.text(toString(this.entity), this.position.x, this.position.y);
    }
  }
}
