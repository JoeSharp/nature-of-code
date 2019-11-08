export interface UseListReducer<T extends {}> {
  items: T[];
  receiveItems: (items: T[]) => void;
  addItem: (item: T) => void;
  removeItem: (matcher: (i: T) => boolean) => void;
  updateItem: (matcher: (i: T) => boolean, newValue: T) => void;
  updateItemAtIndex: (index: number, newValue: T) => void;
  removeItemAtIndex: (index: number) => void;
}
