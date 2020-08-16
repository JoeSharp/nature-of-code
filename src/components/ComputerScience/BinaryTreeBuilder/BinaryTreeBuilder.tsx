import React from "react";
import { UseBinaryTreeBuilder } from "./useBinaryTreeBuilder";
import useSketch from "src/components/p5/useSketch";
import BinaryTreeSketch from "./BinaryTreeSketch";
import ButtonBar, {
  Props as ButtonBarProps,
} from "src/components/Bootstrap/Buttons/ButtonBar";

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
    () => newValue.length > 0 && addValue(newValue),
    [addValue, newValue]
  );

  const { refContainer, updateConfig } = useSketch(BinaryTreeSketch);

  React.useEffect(() => updateConfig({ binaryTree }), [
    binaryTree,
    updateConfig,
  ]);

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          text: "Add",
          onClick: onAddNewItem,
          styleType: "primary",
        },
        {
          text: "Clear",
          styleType: "danger",
          onClick: clearAll,
        },
      ],
    }),
    [onAddNewItem, clearAll]
  );

  return (
    <div>
      <h4>Binary Tree Builder</h4>
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

      <ButtonBar {...buttonBarProps} />

      <div ref={refContainer} />
    </div>
  );
};

export default BinaryTreeBuilder;
