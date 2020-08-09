import React from "react";
import BinaryTreeTraversalAlgorithmPicker, {
  usePicker,
} from "./BinaryTreeTraversalAlgorithmPicker";
import useBinaryTreeTraversal from "./useBinaryTreeTraversal";
import useBinaryTreeBuilder from "../../BinaryTreeBuilder/useBinaryTreeBuilder";
import BinaryTreeBuilder from "../../BinaryTreeBuilder";

const BinaryTreeTraversal: React.FunctionComponent = () => {
  const { algorithmName, componentProps } = usePicker("form-control");

  const binaryTreeBuilder = useBinaryTreeBuilder();
  const { binaryTree, version } = binaryTreeBuilder;

  const { visitedItems } = useBinaryTreeTraversal({
    binaryTree,
    algorithmName,
    version,
  });

  return (
    <div>
      <h1>Binary Tree Traversal</h1>

      <form>
        <div className="form-group">
          <label>Algorithm</label>
          <BinaryTreeTraversalAlgorithmPicker {...componentProps} />
        </div>
      </form>

      <h2>Visited Items</h2>
      <ol>
        {visitedItems.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ol>

      <BinaryTreeBuilder binaryTreeBuilder={binaryTreeBuilder} />
    </div>
  );
};

export default BinaryTreeTraversal;
