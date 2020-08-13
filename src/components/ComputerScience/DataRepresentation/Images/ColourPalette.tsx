import React from "react";
import { ColourMap } from "./types";

interface Props {
  value: number;
  onChange: (v: number) => void;
  availableColours: ColourMap;
  colourDepth: number;
}

const ColourPalette: React.FunctionComponent<Props> = ({
  availableColours,
  colourDepth,
  value,
  onChange,
}) => {
  const availableColoursWithHandlers = React.useMemo(
    () =>
      Object.entries(availableColours).map(([code, colourHex]) => ({
        backgroundColor: colourHex,
        onClick: () => onChange(parseInt(code)),
        isCurrent: value === parseInt(code),
      })),
    [availableColours, onChange, value]
  );

  return (
    <div className="colour-palette">
      <div className="colour-palette__selector">
        {availableColoursWithHandlers.map(
          ({ backgroundColor, onClick, isCurrent }) => (
            <div
              key={backgroundColor}
              style={{ backgroundColor }}
              onClick={onClick}
              className={isCurrent ? "current" : ""}
            ></div>
          )
        )}
      </div>
      <div className="colour-palette__current ml-3">
        <div>Binary: {value.toString(2).padStart(colourDepth, "0")}</div>
        <div>CSS: {availableColours[value]}</div>
        <div
          className="colour-palette__current--swatch"
          style={{ backgroundColor: availableColours[value] }}
        ></div>
      </div>
    </div>
  );
};

interface UseProps {
  colourDepth: number;
}

export interface UseColourPallete {
  componentProps: Props;
}

//https://gist.github.com/ibrechin/2489005
// Thanks matey!
const hslToRgb = function (_h: number, s: number, l: number): string {
  var h = Math.min(_h, 359) / 60;

  var c = (1 - Math.abs(2 * l - 1)) * s;
  var x = c * (1 - Math.abs((h % 2) - 1));
  var m = l - 0.5 * c;

  var r = m,
    g = m,
    b = m;

  if (h < 1) {
    r += c;
    g = +x;
    b += 0;
  } else if (h < 2) {
    r += x;
    g += c;
    b += 0;
  } else if (h < 3) {
    r += 0;
    g += c;
    b += x;
  } else if (h < 4) {
    r += 0;
    g += x;
    b += c;
  } else if (h < 5) {
    r += x;
    g += 0;
    b += c;
  } else if (h < 6) {
    r += c;
    g += 0;
    b += x;
  } else {
    r = 0;
    g = 0;
    b = 0;
  }

  return (
    "rgb(" +
    Math.floor(r * 255) +
    ", " +
    Math.floor(g * 255) +
    ", " +
    Math.floor(b * 255) +
    ")"
  );
};

const createSpectrum = function (length: number): string[] {
  var colors: string[] = [];
  // 270 because we don't want the spectrum to circle back
  var step = 360 / length;
  for (var i = 1; i <= length; i++) {
    var color = hslToRgb(i * step, 0.5, 0.5);
    colors.push(color);
  }

  return colors;
};

export const useColourPallete = ({
  colourDepth,
}: UseProps): UseColourPallete => {
  // Work out available colours based on depth...
  const availableColours: ColourMap = React.useMemo(() => {
    const spectrum = createSpectrum(Math.pow(2, colourDepth));
    return spectrum.reduce((acc, curr, i) => ({ ...acc, [i]: curr }), {});
  }, [colourDepth]);

  const [value, onChange] = React.useState<number>(0);

  return {
    componentProps: { value, onChange, availableColours, colourDepth },
  };
};

export default ColourPalette;
