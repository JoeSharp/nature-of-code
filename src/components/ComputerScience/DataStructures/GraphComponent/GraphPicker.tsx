import React from "react";
import useSavedGraph from "./useSavedGraph";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/types";
import { UseSketch } from "src/components/p5/useSketch";
import GraphSketch from "src/components/ComputerScience/DataStructures/GraphComponent/GraphSketch";
import useGraphSketch from "./useGraphSketch";
import { GraphSketchConfig } from "./GraphBuilder/types";
import { PositionByVertex } from "./types";

interface Props {
  className?: string;
  names: string[];
  value?: string;
  onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const GraphPicker: React.FunctionComponent<Props> = ({
  names,
  className,
  value,
  onSelectChange,
}) => (
  <select className={className} value={value} onChange={onSelectChange}>
    {names.map((name) => (
      <option key={name} value={name}>
        {name}
      </option>
    ))}
  </select>
);

interface UseProps {
  className?: string;
  initialGraph: Graph<StringDataItem>;
}

interface UsePicker {
  graphName: string;
  graph: Graph<StringDataItem>;
  vertexPositions: PositionByVertex;
  componentProps: Props;
  sketchUse: UseSketch<
    GraphSketchConfig<StringDataItem>,
    GraphSketch<StringDataItem>
  >;
}

export const usePicker = ({ className, initialGraph }: UseProps): UsePicker => {
  const { names, graphs, vertexPositionsByGraph } = useSavedGraph();

  const [graphName, setGraphName] = React.useState<string>("default");
  const [graph, setGraph] = React.useState<Graph<StringDataItem>>(initialGraph);
  const [vertexPositions, setVertexPositions] = React.useState<
    PositionByVertex
  >({});

  const onChange = React.useCallback(
    (name: string, graph: Graph<StringDataItem>) => {
      setGraph(graph);
      setGraphName(name);
      setVertexPositions(vertexPositionsByGraph[name]);
    },
    [setGraph, vertexPositionsByGraph, setVertexPositions]
  );

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

  const sketchUse = useGraphSketch({ graph });

  const { updateConfig } = sketchUse;

  React.useEffect(() => updateConfig({ graph, vertexPositions }), [
    graph,
    vertexPositions,
    updateConfig,
  ]);

  return {
    graphName,
    graph,
    vertexPositions,
    componentProps: { className, onSelectChange, value, names },
    sketchUse,
  };
};

export default GraphPicker;
