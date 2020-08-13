import React from "react";

interface Props {
  width: number;
  height: number;
  defaultColour: string;
  availableColours: string[];
}

interface UseBitmapData {
  pixels: string[][];
  rawData: string;
  setColour: (x: number, y: number, colour: string) => void;
  randomiseColours: () => void;
}

interface SetColourAction {
  type: "setColour";
  x: number;
  y: number;
  colour: string;
}

interface InitialiseAction extends Props {
  type: "initialise";
}

interface RandomizeAction {
  type: "randomize";
}

type ReducerAction = SetColourAction | InitialiseAction | RandomizeAction;

interface ReducerState {
  availableColours: string[];
  pixels: string[][];
  rawData: string;
  width: number;
  height: number;
}

const defaultReducerState: ReducerState = {
  availableColours: [],
  pixels: [],
  rawData: "",
  width: 0,
  height: 0,
};

const getRawData = (pixels: string[][]): string => {
  return pixels.map((row) => row.join("")).join("");
};

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case "initialise": {
      const { width, height, defaultColour, availableColours } = action;
      const pixels: string[][] = Array(height)
        .fill(null)
        .map((i) =>
          Array(width)
            .fill(null)
            .map((i) => defaultColour)
        );
      return {
        width,
        height,
        availableColours,
        pixels: pixels,
        rawData: getRawData(pixels),
      };
    }
    case "setColour": {
      const { x, y, colour } = action;
      const pixels = state.pixels.map((row, sx) =>
        sx === x ? row.map((cell, sy) => (sy === y ? colour : cell)) : row
      );

      return {
        ...state,
        pixels: pixels,
        rawData: getRawData(pixels),
      };
    }
    case "randomize": {
      const pixels = state.pixels.map((row) =>
        row.map(
          () =>
            state.availableColours[
              Math.floor(Math.random() * state.availableColours.length)
            ]
        )
      );
      return {
        ...state,
        pixels,
        rawData: getRawData(pixels),
      };
    }
  }
};

export default ({
  height,
  width,
  defaultColour,
  availableColours,
}: Props): UseBitmapData => {
  const [{ pixels, rawData }, dispatch] = React.useReducer(
    reducer,
    defaultReducerState
  );

  React.useEffect(
    () =>
      dispatch({
        type: "initialise",
        width,
        height,
        defaultColour,
        availableColours,
      }),
    [width, height, defaultColour, availableColours]
  );

  const setColour = React.useCallback(
    (x: number, y: number, colour: string) =>
      dispatch({ type: "setColour", x, y, colour }),
    []
  );

  const randomiseColours = React.useCallback(
    () => dispatch({ type: "randomize" }),
    []
  );

  return { pixels, rawData, setColour, randomiseColours };
};
