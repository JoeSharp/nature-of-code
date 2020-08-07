import p5 from "p5";

export interface BoidArgs<T> {
  sketch: p5;
  entity: T;
  location: p5.Vector;
  radius: number;
  borderWeight?: number;
  colour?: string;
  maxSpeed?: number;
  maxForce?: number;
  minForce?: number;
  environmentalFriction?: number;
}

export interface BoidDrawDetails {
  colour?: string;
  borderWeight?: number;
  includeText?: boolean;
}

export interface BoidDrawDetailsById {
  [id: string]: BoidDrawDetails;
}

export interface UseDrawDetails {
  drawDetails: BoidDrawDetailsById;
  setDetails: (id: string, details: BoidDrawDetails) => void;
  clearDetails: () => void;
}
