import p5 from "p5";

export interface BoidArgs<T> {
  sketch: p5;
  entity?: T;
  location: p5.Vector;
  radius: number;
  maxSpeed?: number;
  maxForce?: number;
  minForce?: number;
  environmentalFriction?: number;
}

export type BoidDraw<E, T extends BoidArgs<E>> = (boid: T) => void;
