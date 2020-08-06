import p5 from "p5";

export interface BoidArgs<T> {
  sketch: p5;
  entity?: T;
  location: p5.Vector;
  radius: number;
  colour?: string;
  maxSpeed?: number;
  maxForce?: number;
  minForce?: number;
  environmentalFriction?: number;
}
