import React from "react";
import { UseBinaryTreeBuilder } from "./useBinaryTreeBuilder";
import useSketch from "src/components/p5/useSketch";
import BinaryTreeSketch from "./BinaryTreeSketch";

interface Props {
  binaryTreeBuilder: UseBinaryTreeBuilder;
}

const BinaryTreeBuilder: React.FunctionComponent<Props> = ({
  binaryTreeBuilder: { addValue, binaryTree, version, clearAll },
}) => {
  const [newValue, setNewValue] = React.useState("");

  const onNewValueChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewValue(value),
    [setNewValue]
  );
  const onAddNewItem: React.MouseEventHandler = React.useCallback(
    () => addValue(newValue),
    [addValue, newValue]
  );

  const { refContainer, updateConfig } = useSketch(BinaryTreeSketch);

  React.useEffect(() => updateConfig({ binaryTree }), [
    binaryTree,
    updateConfig,
  ]);

  return (
    <div>
      <form>
        <div className="form-group">
          <label>New Value</label>
          <input
            className="form-control"
            value={newValue}
            onChange={onNewValueChange}
          />
        </div>
      </form>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={onAddNewItem}>
          Add
        </button>
        <button className="btn btn-danger" onClick={clearAll}>
          Clear
        </button>
      </div>

      <div ref={refContainer} />
    </div>
  );
};

export default BinaryTreeBuilder;
