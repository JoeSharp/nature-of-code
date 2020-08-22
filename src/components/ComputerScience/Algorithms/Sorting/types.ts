import { BaseGraphVertex } from "comp-sci-maths-lib/dist/types";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/types";
import BinaryTree from "comp-sci-maths-lib/dist/dataStructures/binaryTree/BinaryTree";

export interface PositionVars {
  [k: string]: number;
}

export enum SortStageType {
  observation,
  swap,
  compare,
}

export interface SortObservation<T> {
  type: SortStageType.observation;
  stageName: string;
  positionVars: PositionVars;
  data: T[];
  splitNodes: BinaryTree<SplitListVertex<StringDataItem>>;
  joinNodes: Graph<SplitListVertex<StringDataItem>>;
}

export interface SortSwap<T> {
  type: SortStageType.swap;
  from: number;
  to: number;
  lastObservation: SortObservation<T>;
}

export interface SortCompare<T> {
  type: SortStageType.compare;
  a: T;
  b: T;
  aIndex: number;
  bIndex: number;
  result: number;
  lastObservation: SortObservation<T>;
}

export type SortStage<T> = SortObservation<T> | SortSwap<T> | SortCompare<T>;

export const DEFAULT_SORT_STAGE: SortStage<any> = {
  type: SortStageType.observation,
  data: [],
  positionVars: {},
  stageName: "empty",
  splitNodes: new BinaryTree((a: any, b: any) => a - b),
  joinNodes: new Graph(),
};

export interface SortingData<T> {
  stages: SortStage<T>[];
  sortedData: T[];
}

export interface SplitListVertex<T> extends BaseGraphVertex<T[]> {
  label: string;
}
