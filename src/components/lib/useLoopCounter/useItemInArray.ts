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

  const item = React.useMemo(() => items[index], [items, index]);

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
