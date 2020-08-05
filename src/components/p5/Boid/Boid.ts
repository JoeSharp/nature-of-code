import p5 from "p5";
import { BoidArgs } from "./types";

const DEFAULT_MAX_SPEED = 1.5;
const DEFAULT_MAX_FORCE = 0.5;
const DEFAULT_MIN_FORCE = 0.01;

export default class Boid<T> implements BoidArgs<T> {
  sketch: p5;
  entity?: T;
  location: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  radius: number;
  maxSpeed: number;
  maxForce: number;
  minForce: number;
  environmentalFriction: number;
  grabbed: boolean;

  constructor({
    sketch,
    entity,
    location,
    radius,
    maxSpeed = DEFAULT_MAX_SPEED,
    maxForce = DEFAULT_MAX_FORCE,
    minForce = DEFAULT_MIN_FORCE,
    environmentalFriction = 0.9,
  }: BoidArgs<T>) {
    this.sketch = sketch;
    this.entity = entity;
    this.location = location;
    this.velocity = sketch.createVector();
    this.acceleration = sketch.createVector();
    this.radius = radius;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.minForce = minForce;
    this.environmentalFriction = environmentalFriction;
    this.grabbed = false;
  }

  grab() {
    this.grabbed = true;
    this.velocity.mult(0);
    this.acceleration.mult(0);
  }

  dragged(mousePosition: p5.Vector) {
    if (this.grabbed) {
      this.location = mousePosition;
    }
  }

  releaseGrab() {
    this.grabbed = false;
  }

  applyForce(force: p5.Vector) {
    force.limit(this.maxForce);
    this.acceleration.add(force);
  }

  update() {
    if (!this.grabbed && this.acceleration.mag() > this.minForce) {
      this.velocity.add(this.acceleration);
      this.velocity.mult(this.environmentalFriction);
      this.location.add(this.velocity);
    }
    this.acceleration.mult(0);
  }

  seek(target: p5.Vector): void {
    let desired = p5.Vector.sub(target, this.location);
    desired.normalize();
    desired.mult(this.maxSpeed);
    desired.sub(this.velocity);
    this.applyForce(desired);
  }

  flee(target: p5.Vector, radius: number = 20): void {
    let desired = p5.Vector.sub(target, this.location);
    if (desired.mag() < radius) {
      desired.normalize();
      desired.mult(-this.maxSpeed);
      desired.sub(this.velocity);
      this.applyForce(desired);
    }
  }

  spring(tether: p5.Vector, springLength: number, tolerance: number) {
    let desired = p5.Vector.sub(tether, this.location);
    let diff = desired.mag() - springLength;
    if (diff < -tolerance) {
      desired.mult(-this.maxSpeed);
      this.applyForce(desired);
    } else if (diff > tolerance) {
      desired.mult(+this.maxSpeed);
      this.applyForce(desired);
    }
  }

  arrive(target: p5.Vector, arriveRadius: number): void {
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
    this.applyForce(desired);
  }

  onScreen() {
    const { x, y } = this.location;
    const { width, height } = this.sketch;
    return x > 0 && x < width && y > 0 && y < height;
  }
}
