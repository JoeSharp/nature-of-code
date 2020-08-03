import p5 from "p5";

interface BoidArgs<T> {
  sketch: p5;
  entity?: T;
  location: p5.Vector;
  colour: any;
  radius: number;
  maxSpeed: number;
  maxForce: number;
  environmentalFriction?: number;
}

export default class Boid<T> implements BoidArgs<T> {
  sketch: p5;
  entity?: T;
  location: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  colour: any;
  radius: number;
  maxSpeed: number;
  maxForce: number;
  environmentalFriction: number;

  constructor({
    sketch,
    entity,
    location,
    radius,
    colour,
    maxSpeed,
    maxForce,
    environmentalFriction = 0.95,
  }: BoidArgs<T>) {
    this.sketch = sketch;
    this.entity = entity;
    this.location = location;
    this.velocity = sketch.createVector();
    this.acceleration = sketch.createVector();
    this.colour = colour;
    this.radius = radius;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.environmentalFriction = environmentalFriction;
  }

  applyForce(force: p5.Vector) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.environmentalFriction);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target: p5.Vector): void {
    let desired = p5.Vector.sub(target, this.location);
    desired.normalize();
    desired.mult(this.maxSpeed);
    desired.sub(this.velocity);
    desired.limit(this.maxForce);
    this.applyForce(desired);
  }

  flee(target: p5.Vector, radius: number = 20): void {
    let desired = p5.Vector.sub(target, this.location);
    if (desired.mag() < radius) {
      desired.normalize();
      desired.mult(-this.maxSpeed);
      desired.sub(this.velocity);
      desired.limit(this.maxForce);
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
    desired.limit(this.maxForce);
    this.applyForce(desired);
  }

  draw() {
    // To be overridden
  }

  onScreen() {
    const { x, y } = this.location;
    const { width, height } = this.sketch;
    return x > 0 && x < width && y > 0 && y < height;
  }
}
