import React from "react";
import p5 from "p5";

function configReducer<T>(state: T, updates: Partial<T>): T {
  return { ...state, ...updates };
}

type ChangeEventHandlerFactory<T> = (
  key: keyof T
) => React.ChangeEventHandler<HTMLInputElement>;

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
  onNumericConfigChange: ChangeEventHandlerFactory<T>;
  onStringConfigChange: ChangeEventHandlerFactory<T>;
  onBooleanConfigChange: ChangeEventHandlerFactory<T>;
}

function useSketch<T extends { [s: string]: any }>(s: {
  new (): AbstractSketch<T>;
}): UseConfig<T> {
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

  const onNumericConfigChange: ChangeEventHandlerFactory<T> = React.useCallback(
    (key: keyof T): React.ChangeEventHandler<HTMLInputElement> => ({
      target: { value },
    }) => updateConfig({ [key]: parseFloat(value) } as Partial<T>),
    [updateConfig]
  );

  const onBooleanConfigChange: ChangeEventHandlerFactory<T> = React.useCallback(
    (key: keyof T): React.ChangeEventHandler<HTMLInputElement> => ({
      target: { checked },
    }) => updateConfig({ [key]: checked } as Partial<T>),
    [updateConfig]
  );

  const onStringConfigChange: ChangeEventHandlerFactory<T> = React.useCallback(
    (key: keyof T): React.ChangeEventHandler<HTMLInputElement> => ({
      target: { value },
    }) => updateConfig({ [key]: value } as Partial<T>),
    [updateConfig]
  );

  return {
    config: config as T,
    updateConfig,
    onNumericConfigChange,
    onStringConfigChange,
    onBooleanConfigChange,
    refContainer,
  };
}

export default useSketch;
