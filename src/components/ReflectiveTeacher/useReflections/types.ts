import { UseListReducer } from "../../useListReducer/types";

export type UseReflections = UseListReducer<Reflection>;

export interface Reflection {
  date: string;
  group: string;
  content: string;
}
