import FlowField from "./FlowField";
import Boid, { BoidArgs } from "../../P5Sketch/Boid";

interface ArrowBoidArgs extends BoidArgs<void> {
  radius: number;
}

export default class ArrowBoidBoid extends Boid<void> {
  radius: number;

  constructor({ radius, ...rest }: ArrowBoidArgs) {
    super(rest);
    this.radius = radius;
  }

  follow(flow: FlowField) {
    let desired = flow.lookup(this.location);
    desired.mult(this.maxSpeed);
    desired.sub(this.velocity);
    desired.limit(this.maxForce);
    return desired;
  }

  draw() {
    let s = this.sketch;

    let theta = this.velocity.heading() + s.PI / 2;
    s.fill(this.colour);
    s.noStroke();
    s.push();
    s.translate(this.location.x, this.location.y);
    s.rotate(theta);
    s.beginShape();
    s.vertex(0, -this.radius * 2);
    s.vertex(-this.radius, this.radius * 2);
    s.vertex(this.radius, this.radius * 2);
    s.endShape();
    s.pop();
  }
}
