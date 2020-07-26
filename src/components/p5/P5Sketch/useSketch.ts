import React from "react";
import p5 from "p5";

function configReducer<T>(state: T, updates: Partial<T>): T {
  return { ...state, ...updates };
}

export abstract class AbstractSketch<T> {
  config: T;

  constructor(defaultConfig: T) {
    this.config = defaultConfig;
  }

  setConfig(config: T) {
    this.config = config;
  }

  abstract sketch: (s: p5) => void;
}

interface UseConfig<T> {
  config: T;
  refContainer: any;
  updateConfig: (s: Partial<T>) => void;
}

function useSketch<T>(s: { new (): AbstractSketch<T> }): UseConfig<T> {
  const refContainer = React.useRef(null);
  const sketchContainer: AbstractSketch<T> = React.useMemo(() => new s(), [s]);
  React.useEffect(() => {
    let sketchInUse: p5;

    if (!!refContainer) {
      sketchInUse = new p5(
        sketchContainer.sketch.bind(sketchContainer),
        (refContainer.current as unknown) as HTMLElement
      );
    }

    return () => {
      if (!!sketchInUse) {
        sketchInUse.remove();
      }
    };
  }, [sketchContainer]);

  const [config, dispatch] = React.useReducer(
    configReducer,
    sketchContainer.config
  );

  const updateConfig = React.useCallback(
    (updates: Partial<T>) => dispatch(updates),
    []
  );

  React.useEffect(() => sketchContainer.setConfig(config as T), [
    config,
    sketchContainer,
  ]);

  return {
    config: config as T,
    updateConfig,
    refContainer,
  };
}

export default useSketch;
