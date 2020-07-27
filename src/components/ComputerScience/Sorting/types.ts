export interface PositionVars {
  [k: string]: number;
}

export interface SortStage<T> {
  stageName: string;
  data: T[];
  positionVars: PositionVars;
}

export const DEFAULT_SORT_STAGE: SortStage<any> = {
  data: [],
  positionVars: {},
  stageName: "empty",
};

export interface SortingData<T> {
  stages: SortStage<T>[];
  sortedData: T[];
}
