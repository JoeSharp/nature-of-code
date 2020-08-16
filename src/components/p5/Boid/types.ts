import p5 from "p5";

export interface AbstractBoid<T> {
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

export interface BaseDataItem<T> {
  key: string;
  label: string;
  value: T;
}

export type NumberDataItem = BaseDataItem<number>;
export type StringDataItem = BaseDataItem<string>;

export interface Point {
  x: number;
  y: number;
}

export type PointDataItem = BaseDataItem<Point>;
