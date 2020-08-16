import React from "react";
import useSavedGraph from "./useSavedGraph";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/types";
import { UseSketch } from "src/components/p5/useSketch";
import GraphSketch from "src/components/ComputerScience/DataStructures/GraphComponent/GraphSketch";
import useGraphSketch from "./useGraphSketch";
import { GraphSketchConfig } from "./GraphBuilder/types";

interface Props {
  className?: string;
  onChange: (name: string, graph: Graph<StringDataItem>) => void;
}

const GraphPicker: React.FunctionComponent<Props> = ({
  className,
  onChange,
}) => {
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
    <select className={className} value={value} onChange={onSelectChange}>
      {names.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

interface UseProps {
  className?: string;
  initialGraph: Graph<StringDataItem>;
}

interface UsePicker {
  graph: Graph<StringDataItem>;
  componentProps: Props;
  sketchUse: UseSketch<
    GraphSketchConfig<StringDataItem>,
    GraphSketch<StringDataItem>
  >;
}

export const usePicker = ({ className, initialGraph }: UseProps): UsePicker => {
  const [graph, setGraph] = React.useState<Graph<StringDataItem>>(initialGraph);

  const onChange = React.useCallback(
    (name: string, graph: Graph<StringDataItem>) => {
      setGraph(graph);
    },
    [setGraph]
  );

  const sketchUse = useGraphSketch({ graph });

  const { updateConfig } = sketchUse;

  React.useEffect(() => updateConfig({ graph }), [graph, updateConfig]);

  return {
    graph,
    componentProps: { className, onChange },
    sketchUse,
  };
};

export default GraphPicker;
