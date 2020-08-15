import { PositionVars } from "comp-sci-maths-lib/dist/types";

export enum SearchStageType {
  observation,
  match,
}

export interface SearchObservation<T> {
  type: SearchStageType.observation;
  stageName: string;
  positionVars: PositionVars;
}

export interface SearchMatch<T> {
  type: SearchStageType.match;
  index: number;
  result: number;
  lastObservation: SearchObservation<T>;
}

export type SearchStage<T> = SearchObservation<T> | SearchMatch<T>;

export const DEFAULT_SEARCH_STAGE: SearchStage<any> = {
  type: SearchStageType.observation,
  stageName: "DEFAULT",
  positionVars: {},
};

export interface SearchingData<T> {
  stages: SearchStage<T>[];
  matchIndex: number;
  searchItem: string;
  data: T[];
}
