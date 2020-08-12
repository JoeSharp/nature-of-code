import React from "react";

import Stack from "comp-sci-maths-lib/dist/dataStructures/stack/Stack";
import useListReducer from "src/components/lib/useListReducer";

import "./stack.css";

const StackComponent: React.FunctionComponent = () => {
  const stack = React.useRef<Stack<number>>(new Stack());

  const [items, setItems] = React.useState<number[]>([]);
  const [newItem, setNewItem] = React.useState<number>(0);

  const {
    items: poppedItems,
    addItem: addPoppedItem,
    clearItems: clearPoppedItems,
  } = useListReducer();

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
    stack.current.push(newItem);
    setNewItem(newItem + 1);
    updateItems();
  }, [newItem, setNewItem, updateItems]);

  const onPop = React.useCallback(() => {
    try {
      addPoppedItem(stack.current.pop());
      updateItems();
    } catch (e) {
      addPoppedItem(`${e}`);
    }
  }, [updateItems, addPoppedItem]);

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

      <div className="stackItems">
        <div>
          <h2>Stack Contents</h2>
          <ol>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>

        <div>
          <h2>Popped Items</h2>
          <ol>
            {poppedItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default StackComponent;
