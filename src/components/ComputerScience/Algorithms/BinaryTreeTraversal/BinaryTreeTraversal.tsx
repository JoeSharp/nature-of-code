import React from "react";
import BinaryTreeTraversalAlgorithmPicker, {
  usePicker,
} from "./BinaryTreeTraversalAlgorithmPicker";
import BinaryTree from "comp-sci-maths-lib/dist/dataStructures/binaryTree/BinaryTree";
import { stringComparator } from "comp-sci-maths-lib/dist/common";
import useBinaryTreeTraversal from "./useBinaryTreeTraversal";

const BinaryTreeTraversal: React.FunctionComponent = () => {
  const { algorithmName, componentProps } = usePicker("form-control");

  const binaryTree = React.useMemo(() => {
    const myTree: BinaryTree<string> = new BinaryTree<string>(stringComparator)
      .add("B")
      .add("A")
      .add("D")
      .add("E")
      .add("C")
      .add("F");
    return myTree;
  }, []);

  const { visitedItems } = useBinaryTreeTraversal({
    binaryTree,
    algorithmName,
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
    </div>
  );
};

export default BinaryTreeTraversal;
