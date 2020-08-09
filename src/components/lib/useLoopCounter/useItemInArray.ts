import React from "react";

import useLoopCounter from "./useLoopCounter";

interface Props<T> {
  items: T[];
}

export interface UseItemInArray<T> {
  item: T;
  index: number;
  goToFirst: () => void;
  goToLast: () => void;
  stepForward: () => void;
  stepBackward: () => void;
}

const useItemInArray = <T>({ items }: Props<T>): UseItemInArray<T> => {
  const {
    count: index,
    goToFirst,
    goToLast,
    decrement,
    increment,
  } = useLoopCounter({
    max: items.length - 1,
  });

  // The items can be updated before the index has a chance to change,
  // so we must guard against running off the end of the items list.
  const item = React.useMemo(
    () => (index < items.length - 1 ? items[index] : items[items.length - 1]),
    [items, index]
  );

  return {
    item,
    index,
    goToFirst,
    goToLast,
    stepForward: React.useCallback(() => increment(1), [increment]),
    stepBackward: React.useCallback(() => decrement(1), [decrement]),
  };
};

export default useItemInArray;
