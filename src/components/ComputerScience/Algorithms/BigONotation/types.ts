export interface BigOMeasurements {
  [n: number]: number[];
}

export interface MeasureProps {
  enabled: boolean;
  samples: number;
  startSize: number;
  endSize: number;
  step: number;
}
