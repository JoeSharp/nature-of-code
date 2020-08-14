import React from "react";

import Stack from "comp-sci-maths-lib/dist/dataStructures/stack/Stack";
import useListReducer from "src/components/lib/useListReducer";

import "./stack.css";
import useSketch from "src/components/p5/useSketch";
import {
  ArraySketchNumber,
  NumberDataItem,
  Orientation,
} from "../QueueComponent/ArraySketch";

const StackComponent: React.FunctionComponent = () => {
  const stack = React.useRef<Stack<NumberDataItem>>(new Stack());

  const [items, setItems] = React.useState<NumberDataItem[]>([]);
  const [newItem, setNewItem] = React.useState<number>(0);
  const [nextKey, incrementNextKey] = React.useReducer((d) => d + 1, 0);

  const {
    items: poppedItems,
    addItem: addPoppedItem,
    clearItems: clearPoppedItems,
  } = useListReducer<NumberDataItem>();

  const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewItem(parseInt(value)),
    [setNewItem]
  );

  const updateItems = React.useCallback(
    () => setItems(stack.current.getItems().toArray()),
    [setItems]
  );

  const onReset = React.useCallback(() => {
    setItems([]);
    clearPoppedItems();
    setNewItem(0);
  }, [setNewItem, setItems, clearPoppedItems]);

  const onPush = React.useCallback(() => {
    stack.current.push({
      key: nextKey.toString(),
      label: newItem.toString(),
      value: newItem,
    });
    setNewItem(newItem + 1);
    incrementNextKey();
    updateItems();
  }, [newItem, setNewItem, nextKey, incrementNextKey, updateItems]);

  const onPop = React.useCallback(() => {
    try {
      addPoppedItem(stack.current.pop());
      updateItems();
    } catch (e) {
      addPoppedItem(e);
    }
  }, [updateItems, addPoppedItem]);

  const { updateConfig, refContainer } = useSketch(ArraySketchNumber);

  React.useEffect(
    () =>
      updateConfig({
        orientation: Orientation.vertical,
        dataItems: items,
        lastRetrievedItem: poppedItems.reduce<NumberDataItem | null>(
          (_, curr) => curr,
          null
        ),
      }),
    [items, poppedItems, updateConfig]
  );

  return (
    <div>
      <p></p>

      <form>
        <div className="form-group">
          <label>New Item</label>
          <input
            className="form-control"
            value={newItem}
            type="number"
            onChange={onNewItemChange}
          />
        </div>
      </form>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={onPush}>
          Push
        </button>
        <button className="btn btn-primary" onClick={onPop}>
          Pop
        </button>
        <button className="btn btn-danger" onClick={onReset}>
          Reset
        </button>
      </div>
      <div ref={refContainer} />
    </div>
  );
};

export default StackComponent;
