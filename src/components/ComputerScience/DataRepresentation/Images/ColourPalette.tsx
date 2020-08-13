import React from "react";
import { ControlledInput } from "src/types";

interface Props extends ControlledInput<string> {
  availableColours: string[];
}

const ColourPalette: React.FunctionComponent<Props> = ({
  availableColours,
  value,
  onChange,
}) => {
  const availableColoursWithHandlers = React.useMemo(
    () =>
      availableColours.map((colour) => ({
        backgroundColor: `#${colour}`,
        onClick: () => onChange(colour),
        isCurrent: value === colour,
      })),
    [availableColours, onChange, value]
  );

  return (
    <div className="colour-palette">
      {availableColoursWithHandlers.map(
        ({ backgroundColor, onClick, isCurrent }) => (
          <div
            key={backgroundColor}
            style={{ backgroundColor }}
            className={
              isCurrent
                ? "pallette-square pallette-square__current-selection"
                : "pallette-square"
            }
            onClick={onClick}
          ></div>
        )
      )}
    </div>
  );
};

interface UseProps {
  availableColours?: string[];
}

export interface UseColourPallete {
  componentProps: Props;
}

export const useColourPallete = ({
  availableColours = ["red", "blue"],
}: UseProps): UseColourPallete => {
  const [value, onChange] = React.useState<string>(availableColours[0]);

  return {
    componentProps: { value, onChange, availableColours },
  };
};

export default ColourPalette;
