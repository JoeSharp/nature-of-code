import * as React from "react";

interface AddItem {
  type: "add";
  item: string;
}

interface RemoveItem {
  type: "remove";
  item: string;
}

type Action = AddItem | RemoveItem;

function listReducer(state: string[], { type, item }: Action) {
  switch (type) {
    case "add":
      let items: string[] = item.split(" ");
      return [...state.filter(s => !items.includes(s)), ...items].sort();
    case "remove":
      return state.filter(s => s !== item);
  }

  return state;
}

interface ListReducer {
  add: (item: string) => void;
  remove: (item: string) => void;
  items: string[];
}

const useList = (initialItems: string[] = []): ListReducer => {
  const [items, dispatch] = React.useReducer(listReducer, initialItems);

  const add = React.useCallback(
    (item: string) => dispatch({ type: "add", item }),
    []
  );
  const remove = React.useCallback(
    (item: string) => dispatch({ type: "remove", item }),
    []
  );

  return {
    add,
    remove,
    items
  };
};

export default useList;
