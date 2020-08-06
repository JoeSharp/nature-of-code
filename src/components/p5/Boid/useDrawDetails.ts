import React from "react";

import { BoidDrawDetailsById, BoidDrawDetails, UseDrawDetails } from "./types";

interface SetDetailsAction {
  type: "set";
  id: string;
  details: BoidDrawDetails;
}

interface ClearAction {
  type: "clear";
}

type Action = SetDetailsAction | ClearAction;

const reducer = (
  state: BoidDrawDetailsById,
  action: Action
): BoidDrawDetailsById => {
  switch (action.type) {
    case "set":
      return {
        ...state,
        [action.id]: action.details,
      };
    case "clear":
      return {};
  }
};

export default (): UseDrawDetails => {
  const [drawDetails, dispatch] = React.useReducer(reducer, {});

  const setDetails = React.useCallback(
    (id: string, details: BoidDrawDetails) =>
      dispatch({ type: "set", id, details }),
    []
  );
  const clearDetails = React.useCallback(() => dispatch({ type: "clear" }), []);

  return { drawDetails, setDetails, clearDetails };
};
