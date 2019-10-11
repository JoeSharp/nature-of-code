import * as React from "react";
import * as p5 from "p5";

import { useConfig, Config, signalTypes } from "./sketch";

type ChangeEventHandlerFactory = (
  key: keyof Config
) => React.ChangeEventHandler<HTMLInputElement>;

const AnalogueSignals: React.FunctionComponent = () => {
  const refContainer = React.useRef(null);
  const {
    config: {
      samplingRate,
      quantisationStep,
      signalFrequency,
      signalType,
      plotSignal,
      plotSamples,
      plotQuantisation,
      plotSquareWave
    },
    updateConfig,
    sketchContainer
  } = useConfig();

  const onNumericConfigChange: ChangeEventHandlerFactory = React.useCallback(
    (key: string): React.ChangeEventHandler<HTMLInputElement> => ({
      target: { value }
    }) => updateConfig({ [key]: parseFloat(value) }),
    [updateConfig]
  );

  const onBooleanConfigChange: ChangeEventHandlerFactory = React.useCallback(
    (key: string): React.ChangeEventHandler<HTMLInputElement> => ({
      target: { checked }
    }) => updateConfig({ [key]: checked }),
    [updateConfig]
  );

  const onSamplingRateChange = React.useMemo(
    () => onNumericConfigChange("samplingRate"),
    [onNumericConfigChange]
  );
  const onQuantisationStepChange = React.useMemo(
    () => onNumericConfigChange("quantisationStep"),
    [onNumericConfigChange]
  );
  const onSignalFrequencyChange = React.useMemo(
    () => onNumericConfigChange("signalFrequency"),
    [onNumericConfigChange]
  );

  const onPlotSignalChange = React.useMemo(
    () => onBooleanConfigChange("plotSignal"),
    [onBooleanConfigChange]
  );
  const onPlotSamplesChange = React.useMemo(
    () => onBooleanConfigChange("plotSamples"),
    [onBooleanConfigChange]
  );
  const onPlotQuantisationChange = React.useMemo(
    () => onBooleanConfigChange("plotQuantisation"),
    [onBooleanConfigChange]
  );
  const onPlotSquareWaveChange = React.useMemo(
    () => onBooleanConfigChange("plotSquareWave"),
    [onBooleanConfigChange]
  );
  const onSignalTypeChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = React.useCallback(
    ({ target: { value } }) => updateConfig({ signalType: value }),
    [updateConfig]
  );

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

  return (
    <div>
      <h1>Analogue Signals</h1>
      <form>
        <div className="form-group">
          <label htmlFor="signalType">Signal Type</label>
          <select
            className="custom-select"
            id="signalType"
            value={signalType}
            onChange={onSignalTypeChange}
          >
            {signalTypes.map(signalType => (
              <option key={signalType} value={signalType}>
                {signalType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="samplingRate">Sampling Rate</label>
          <input
            type="number"
            className="form-control"
            id="samplingRate"
            placeholder="Sampling Rate"
            value={samplingRate}
            onChange={onSamplingRateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantisationStep">Quantisation Step</label>
          <input
            type="number"
            className="form-control"
            id="quantisationStep"
            placeholder="Quantisation Step"
            value={quantisationStep}
            onChange={onQuantisationStepChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signalFrequency">Signal Frequency</label>
          <input
            type="number"
            className="form-control"
            id="signalFrequency"
            placeholder="Signal Frequency"
            step="0.01"
            value={signalFrequency}
            onChange={onSignalFrequencyChange}
          />
        </div>
        <h4>Plot</h4>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotSignal}
            onChange={onPlotSignalChange}
            id="chkPlotSignal"
          />
          <label className="form-check-label" htmlFor="chkPlotSignal">
            Signal
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotSamples}
            onChange={onPlotSamplesChange}
            id="chkPlotSamples"
          />
          <label className="form-check-label" htmlFor="chkPlotSamples">
            Samples
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotQuantisation}
            onChange={onPlotQuantisationChange}
            id="chkPlotQuantisation"
          />
          <label className="form-check-label" htmlFor="chkPlotQuantisation">
            Quantisation
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotSquareWave}
            onChange={onPlotSquareWaveChange}
            id="chkPlotSquareWave"
          />
          <label className="form-check-label" htmlFor="chkPlotSquareWave">
            Square Wave
          </label>
        </div>
      </form>
      <div ref={refContainer} />
    </div>
  );
};

export default AnalogueSignals;
