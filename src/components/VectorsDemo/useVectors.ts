import * as React from "react";
import * as p5 from "p5";

interface LocalisedVector {
  startPoint: p5.Vector;
  vector: p5.Vector;
}

interface State {
  vectors: {
    [s: string]: LocalisedVector;
  };
}

const defaultState: State = {
  vectors: {}
};

interface AddVectorAction {
  type: "add-vector";
  key: string;
  localisedVector: LocalisedVector;
}

type Action = AddVectorAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add-vector":
      return {
        ...state,
        vectors: { ...state.vectors, [action.key]: action.localisedVector }
      };
  }

  return state;
};

interface UseVectors {
  state: State;
  addVector: (key: string, localisedVector: LocalisedVector) => void;
}

const useVectors = (): UseVectors => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  return {
    state,
    addVector: React.useCallback(
      (key: string, localisedVector: LocalisedVector) => {
        dispatch({ type: "add-vector", key, localisedVector });
      },
      [dispatch]
    )
  };
};

export default useVectors;
