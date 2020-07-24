import { storiesOf } from "@storybook/react";
import { loremIpsum } from "lorem-ipsum";
import React from "react";
import ListBuilder from "./ListBuilder";

const generateItem = () => loremIpsum({ count: 3, units: "words" });

const TEST_ITEMS: string[] = Array(5).fill(null).map(generateItem);

interface Props {
  initialItems: string[];
}

const TestHarness: React.FunctionComponent<Props> = ({ initialItems }) => {
  const [items, setItems] = React.useState<string[]>([]);

  return (
    <div>
      <ListBuilder
        initialItems={TEST_ITEMS}
        onChange={setItems}
        dataType="string"
        newItemLabel="Some String"
      />
      <div>{JSON.stringify(items)}</div>
    </div>
  );
};

storiesOf("lib/ListBuilder", module).add("test", () => (
  <TestHarness initialItems={TEST_ITEMS} />
));
