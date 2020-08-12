import React from "react";
import useBitmapData from "./useBitmapData";
import ColourPalette, { useColourPallete } from "./ColourPalette";

import "./bitmapping.css";

const WIDTH: number = 10;
const HEIGHT: number = 20;
const AVAILABLE_COLOURS: string[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "black",
];

const Bitmapping: React.FunctionComponent = () => {
  const { componentProps: paletteProps } = useColourPallete({
    availableColours: AVAILABLE_COLOURS,
  });
  const { value: currentColour = AVAILABLE_COLOURS[0] } = paletteProps;

  const { pixels, setColour } = useBitmapData({
    width: WIDTH,
    height: HEIGHT,
    defaultColour: AVAILABLE_COLOURS[0],
  });

  const pixelsWithHandlers = React.useMemo(
    () =>
      pixels.map((row, x) =>
        row.map((colour, y) => ({
          colour,
          onClick: () => setColour(x, y, currentColour),
        }))
      ),
    [currentColour, pixels, setColour]
  );

  return (
    <div>
      <table className="bitmap-table">
        <tbody>
          {pixelsWithHandlers.map((row, x) => (
            <tr key={x}>
              {row.map(({ colour, onClick }, y) => (
                <td
                  key={y}
                  style={{ backgroundColor: colour }}
                  onClick={onClick}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Available Colours</h4>
      <ColourPalette {...paletteProps} />
    </div>
  );
};

export default Bitmapping;
