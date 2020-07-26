import p5 from "p5";

import FlowField from "./FlowField";

interface BoidArgs {
  sketch: p5;
  location: p5.Vector;
  colour: any;
  radius: number;
  maxSpeed: number;
  maxForce: number;
}

export default class Boid implements BoidArgs {
  sketch: p5;
  location: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  colour: any;
  radius: number;
  maxSpeed: number;
  maxForce: number;

  constructor({
    sketch,
    location,
    radius,
    colour,
    maxSpeed,
    maxForce,
  }: BoidArgs) {
    this.sketch = sketch;
    const { createVector, random } = this.sketch;
    this.location = location;
    this.velocity = createVector(random(), random());
    this.acceleration = createVector();
    this.colour = colour;
    this.radius = radius;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  applyForce(force: p5.Vector) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target: p5.Vector) {
    let desired = p5.Vector.sub(target, this.location);
    desired.normalize();
    desired.mult(this.maxSpeed);
    desired.sub(this.velocity);
    desired.limit(this.maxForce);
    return desired;
  }

  arrive(target: p5.Vector, arriveRadius: number) {
    const s = this.sketch;
    let desired = p5.Vector.sub(target, this.location);
    let d = desired.mag();
    desired.normalize();
    if (d < arriveRadius) {
      let m = s.map(d, 0, arriveRadius, 0, this.maxSpeed);
      desired.mult(m);
    } else {
      desired.mult(this.maxSpeed);
    }
    desired.sub(this.velocity);
    desired.limit(this.maxForce);
    return desired;
  }

  follow(flow: FlowField) {
    let desired = flow.lookup(this.location);
    desired.mult(this.maxSpeed);
    desired.sub(this.velocity);
    desired.limit(this.maxForce);
    return desired;
  }

  display() {
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

  onScreen() {
    const { x, y } = this.location;
    const { width, height } = this.sketch;
    return x > 0 && x < width && y > 0 && y < height;
  }
}
