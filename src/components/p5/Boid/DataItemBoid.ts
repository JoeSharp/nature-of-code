import p5 from "p5";
import Boid from "./Boid";
import { v4 as uuidv4 } from "uuid";
import { NumberDataItem, StringDataItem } from "./types";

export const createSimpleStringDataItem = (
  content: string
): StringDataItem => ({
  key: uuidv4(),
  label: content,
  value: content,
});

export const createSimpleNumberDataItem = (
  content: number
): NumberDataItem => ({
  key: uuidv4(),
  label: content.toString(10),
  value: content,
});

export default class DataItemBoid<T> extends Boid<T> {
  isMouseOver(mousePosition: p5.Vector) {
    // Is the mouse pointer within the radius of our boid circle?
    let diff = p5.Vector.sub(this.position, mousePosition);
    return diff.mag() < this.radius;
  }

  update(s: p5) {
    super.update(s);

    // Clip to Sides
    if (this.position.x > s.width) {
      this.position.x = s.width;
    } else if (this.position.x < 0) {
      this.position.x = 0;
    }

    // Clip to top and bottom
    if (this.position.y > s.height) {
      this.position.y = s.height;
    } else if (this.position.y < 0) {
      this.position.y = 0;
    }
  }

  draw(s: p5) {
    s.stroke("black");
    if (this.grabbed) {
      s.strokeWeight(4);
    } else {
      s.strokeWeight(this.borderWeight);
    }

    s.fill(this.colour);
    s.ellipse(this.position.x, this.position.y, this.radius);

    if (this.label !== undefined) {
      s.fill("white");
      s.textAlign(s.CENTER, s.CENTER);
      s.text(this.label, this.position.x, this.position.y);
    }
  }
}
