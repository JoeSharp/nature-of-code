import React from "react";

import Queue from "comp-sci-maths-lib/dist/dataStructures/queue/Queue";
import useListReducer from "src/components/lib/useListReducer";

import "./queue.css";

const StackComponent: React.FunctionComponent = () => {
  const queue = React.useRef<Queue<number>>(new Queue());

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
    () => setItems(queue.current.items.toArray()),
    [setItems]
  );

  const onReset = React.useCallback(() => {
    setItems([]);
    clearPoppedItems();
    setNewItem(0);
  }, [setNewItem, setItems, clearPoppedItems]);

  const onEnqueue = React.useCallback(() => {
    queue.current.enqueue(newItem);
    setNewItem(newItem + 1);
    updateItems();
  }, [newItem, setNewItem, updateItems]);

  const onDequeue = React.useCallback(() => {
    try {
      addPoppedItem(queue.current.dequeue());
      updateItems();
    } catch (e) {
      addPoppedItem(`${e}`);
    }
  }, [updateItems, addPoppedItem]);

  return (
    <div>
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
        <button className="btn btn-primary" onClick={onEnqueue}>
          Enqueue
        </button>
        <button className="btn btn-primary" onClick={onDequeue}>
          Dequeue
        </button>
        <button className="btn btn-danger" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="stackItems">
        <div>
          <h2>Queue Contents</h2>
          <ol>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>

        <div>
          <h2>Dequeued Items</h2>
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
