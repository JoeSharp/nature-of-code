import * as p5 from "p5";
import { AbstractSketch } from "../P5Sketch/useSketch";

export const SIGNAL_MODE_SINE = "Sine Wave";
export const SIGNAL_MODE_NOISE = "Perlin Noise";

export const signalTypes = [SIGNAL_MODE_SINE, SIGNAL_MODE_NOISE];

export interface Config {
  samplingRate: number;
  quantisationStep: number;
  signalFrequency: number;
  plotSignal: boolean;
  plotSamples: boolean;
  plotSquareWave: boolean;
  plotQuantisation: boolean;
  signalType: string;
}

const defaultConfig: Config = {
  samplingRate: 30,
  quantisationStep: 10,
  signalFrequency: 0.04,
  plotSignal: true,
  plotSamples: false,
  plotQuantisation: false,
  plotSquareWave: false,
  signalType: SIGNAL_MODE_SINE
};

interface Sample {
  signal: number;
  isKeySample: boolean;
}

class Sketch extends AbstractSketch<Config> {
  constructor() {
    super(defaultConfig);
  }

  sketch = (s: p5) => {
    const that = this;
    let analogueSignal: Sample[] = [];
    let quantisedSignal: Sample[] = [];
    let lastSample = -1;
    let timeSinceLastSample: number = 0;
    const CROSS_LENGTH = 5;

    s.setup = function() {
      s.createCanvas(600, 600);
    };

    s.draw = function() {
      s.background(240);

      const {
        samplingRate,
        quantisationStep,
        signalFrequency,
        plotSignal,
        plotSamples,
        plotSquareWave,
        plotQuantisation,
        signalType
      } = that.config;

      // Record analogue signal
      let signalValue = 0.0;
      switch (signalType) {
        case SIGNAL_MODE_SINE:
          signalValue =
            (s.sin(s.frameCount * signalFrequency) * s.height) / 3 +
            s.height / 2;
          break;
        case SIGNAL_MODE_NOISE:
          signalValue = s.noise(s.frameCount * signalFrequency) * s.height;
          break;
      }

      // Move digital signal on
      let isKeySample = false;
      if (timeSinceLastSample > samplingRate) {
        lastSample = signalValue;
        timeSinceLastSample = 0;
        isKeySample = true;
      }
      timeSinceLastSample += 1;

      // Calculate digital sample
      let qError = lastSample % quantisationStep;
      let quantisedSignalValue = lastSample - qError;
      if (s.abs(qError) > quantisationStep / 2) {
        quantisedSignalValue += quantisationStep;
      }

      // Write the signals
      analogueSignal.splice(0, 0, {
        signal: signalValue,
        isKeySample
      });
      quantisedSignal.splice(0, 0, {
        signal: quantisedSignalValue,
        isKeySample
      });

      // Control their length
      while (analogueSignal.length > s.width) {
        analogueSignal.pop();
      }

      // Draw Axis and gridlines
      s.noFill();
      s.stroke("black");
      s.strokeWeight(2);
      s.line(0, s.height / 2, s.width, s.height / 2);
      s.strokeWeight(1);
      s.stroke("grey");
      for (let y = 0; y < s.height; y += quantisationStep) {
        s.line(0, y, s.width, y);
      }

      // Plot the Samples
      if (plotSamples) {
        s.stroke("green");
        analogueSignal.forEach(({ signal, isKeySample }, x) => {
          if (isKeySample) {
            s.strokeWeight(2);
            s.push();
            s.translate(x, signal);
            s.line(-CROSS_LENGTH, -CROSS_LENGTH, CROSS_LENGTH, CROSS_LENGTH);
            s.line(-CROSS_LENGTH, CROSS_LENGTH, CROSS_LENGTH, -CROSS_LENGTH);
            //point(x, signal)
            s.pop();
            s.strokeWeight(1);
            s.line(x, signal, x, s.height / 2);
          }
        });
      }

      // Plot Quantisation
      if (plotQuantisation) {
        s.stroke("red");
        s.strokeWeight(8);
        quantisedSignal.forEach(({ signal, isKeySample }, x) => {
          if (isKeySample) {
            s.point(x, signal);
          }
        });
      }

      // Draw the Analogue Signal
      if (plotSignal) {
        showSignal("blue", analogueSignal);
      }

      if (plotSquareWave) {
        showSignal("red", quantisedSignal);
      }
    };

    function showSignal(colour: string, signal: Sample[]) {
      s.stroke(colour);
      s.strokeWeight(1);
      s.beginShape();
      signal.forEach(({ signal }, x) => {
        s.vertex(x, signal);
      });
      s.endShape();
    }
  };
}

export default Sketch;
