import React from "react";

import Stack from "ocr-cs-alevel-ts/dist/dataStructures/stack/Stack";
import useListReducer from "src/components/lib/useListReducer";

import "./stack.css";

const StackComponent: React.FunctionComponent = () => {
  const stack = React.useRef<Stack<number>>(new Stack());

  const [items, setItems] = React.useState<number[]>([]);
  const [newItem, setNewItem] = React.useState<number>(0);

  const { items: poppedItems, addItem: addPoppedItem } = useListReducer();

  const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewItem(parseInt(value)),
    [setNewItem]
  );

  const updateItems = React.useCallback(
    () => setItems(stack.current.getItems().toArray()),
    [setItems]
  );

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
      <h1>Stack</h1>

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
        <button className="btn btn-danger" onClick={onPop}>
          Pop
        </button>
      </div>

      <div className="stackItems">
        <table>
          <thead>
            <tr>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr>
                <td>{i}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
