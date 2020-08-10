import p5 from "p5";

export interface AbstractBoid<T> {
  sketch: p5;
  entity: T;
  position: p5.Vector;
  radius: number;
  label?: string;
  borderWeight?: number;
  colour?: string;
  maxSpeed?: number;
  maxForce?: number;
  minForce?: number;
  environmentalFriction?: number;
}
