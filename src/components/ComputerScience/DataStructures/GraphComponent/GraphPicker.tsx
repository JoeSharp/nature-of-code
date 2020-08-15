import React from "react";
import useSavedGraph from "./useSavedGraph";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/DataItemBoid";

interface Props {
  onChange: (name: string, graph: Graph<StringDataItem>) => void;
}

const GraphPicker: React.FunctionComponent<Props> = ({ onChange }) => {
  const { names, graphs } = useSavedGraph();

  const [value, setValue] = React.useState<string>();

  React.useEffect(() => setValue(names.length > 0 ? names[0] : undefined), [
    names,
    setValue,
  ]);

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => {
      onChange(value, graphs[value]);
      setValue(value);
    },
    [onChange, graphs]
  );

  return (
    <select value={value} onChange={onSelectChange}>
      {names.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

interface UseGraphPicker {}

export const useGraphPicker = (): UseGraphPicker => {
  return {};
};

export default GraphPicker;
