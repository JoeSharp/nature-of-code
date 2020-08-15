import { BaseDataItem } from "src/components/p5/Boid/DataItemBoid";

export interface Point {
  x: number;
  y: number;
}

export type PointDataItem = BaseDataItem<Point>;
