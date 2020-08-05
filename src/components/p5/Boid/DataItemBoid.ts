import p5 from "p5";
import Boid from "./Boid";

export const defaultDataItemDraw = (boid: DataItemBoid) => {
  if (boid.grabbed) {
    boid.sketch.strokeWeight(4);
  } else {
    boid.sketch.strokeWeight(1);
  }

  boid.sketch.fill("red");
  boid.sketch.ellipse(boid.location.x, boid.location.y, boid.radius);
  boid.sketch.fill("white");
  boid.sketch.text(boid.entity || "NONE", boid.location.x, boid.location.y);
};

export default class DataItemBoid extends Boid<string> {
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
}
