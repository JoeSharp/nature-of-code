import React from "react";

interface Props {
  width: number;
  height: number;
  defaultColour: string;
}

interface UseBitmapData {
  pixels: string[][];
  setColour: (x: number, y: number, colour: string) => void;
}

interface SetColourAction {
  type: "setColour";
  x: number;
  y: number;
  colour: string;
}

interface InitialiseAction {
  type: "initialise";
  width: number;
  height: number;
  defaultColour: string;
}

type ReducerAction = SetColourAction | InitialiseAction;

interface ReducerState {
  pixels: string[][];
  width: number;
  height: number;
}

const defaultReducerState: ReducerState = {
  pixels: [],
  width: 0,
  height: 0,
};

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case "initialise": {
      const { width, height, defaultColour } = action;
      return {
        width,
        height,
        pixels: Array(width)
          .fill(null)
          .map((i) =>
            Array(height)
              .fill(null)
              .map((i) => defaultColour)
          ),
      };
    }
    case "setColour": {
      const { x, y, colour } = action;

      return {
        ...state,
        pixels: state.pixels.map((row, sx) =>
          sx === x ? row.map((cell, sy) => (sy === y ? colour : cell)) : row
        ),
      };
    }
  }
};

export default ({ height, width, defaultColour }: Props): UseBitmapData => {
  const [{ pixels }, dispatch] = React.useReducer(reducer, defaultReducerState);

  React.useEffect(
    () => dispatch({ type: "initialise", width, height, defaultColour }),
    [width, height, defaultColour]
  );

  const setColour = React.useCallback(
    (x: number, y: number, colour: string) =>
      dispatch({ type: "setColour", x, y, colour }),
    []
  );

  return { setColour, pixels };
};
