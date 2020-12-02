export interface BigOMeasurements {
  [n: number]: number[];
}

export interface MeasureProps {
  samples: number;
  startSize: number;
  endSize: number;
  step: number;
}
