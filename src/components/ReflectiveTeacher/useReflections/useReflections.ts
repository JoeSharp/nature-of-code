import React from "react";
import { UseReflections, Reflection } from "./types";
import useListReducer from "src/components/useListReducer/useListReducer";

const INITIAL_DATA: Reflection[] = [
  {
    date: "Monday 4th Nov",
    group: "802",
    content: "Some content here!"
  },
  {
    date: "Monday 4th Nov",
    group: "8G2",
    content: "More content here!"
  }
];

const useReflections = (): UseReflections => {
  const listReducer = useListReducer<Reflection>();
  const { receiveItems } = listReducer;

  React.useEffect(() => {
    receiveItems(INITIAL_DATA);
  }, [receiveItems]);

  return listReducer;
};

export default useReflections;
