import React from "react";
import useSavedGraph, {
  UseSavedGraph,
  DEFAULT_GRAPH_OPTION,
} from "./useSavedGraph";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "src/components/p5/Boid/types";
import { UseSketch } from "src/components/p5/useSketch";
import GraphSketch from "src/components/ComputerScience/DataStructures/GraphManager/GraphSketch";
import useGraphSketch from "./useGraphSketch";
import { GraphSketchConfig } from "./GraphBuilder/types";
import { PositionByVertex } from "./types";

interface Props {
  names: string[];
  value?: string;
  onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  refContainer: any;
}

const GraphPickerWithSketch: React.FunctionComponent<Props> = ({
  names,
  value,
  onSelectChange,
  refContainer,
}) => (
  <React.Fragment>
    <div className="form-group">
      <label>Graph</label>
      <select className="form-control" value={value} onChange={onSelectChange}>
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>

    <div className="sketch mt-3" ref={refContainer} />
  </React.Fragment>
);

interface UsePicker {
  graphName: string;
  graph: Graph<StringDataItem>;
  vertexPositions: PositionByVertex;
  componentProps: Props;
  savedGraphUse: UseSavedGraph;
  sketchUse: UseSketch<
    GraphSketchConfig<StringDataItem>,
    GraphSketch<StringDataItem>
  >;
}

export const usePicker = (defaultGraph: Graph<StringDataItem>): UsePicker => {
  const savedGraphUse = useSavedGraph(defaultGraph);
  const { names, graphs, vertexPositionsByGraph } = savedGraphUse;

  const [graphName, setGraphName] = React.useState<string>(
    DEFAULT_GRAPH_OPTION
  );
  const [graph, setGraph] = React.useState<Graph<StringDataItem>>(defaultGraph);
  const [vertexPositions, setVertexPositions] = React.useState<
    PositionByVertex
  >({});

  const onChange = React.useCallback(
    (name: string, graph: Graph<StringDataItem>) => {
      console.log("Fuck off wankbadger", { name, graph });
      setGraph(graph);
      setGraphName(name);
      setVertexPositions(vertexPositionsByGraph[name]);
    },
    [setGraph, vertexPositionsByGraph, setVertexPositions]
  );

  const [value, setValue] = React.useState<string>();

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => {
      onChange(value, graphs[value]);
      setValue(value);
    },
    [onChange, graphs]
  );

  const sketchUse = useGraphSketch({ graph });

  const { updateConfig, refContainer } = sketchUse;

  React.useEffect(() => updateConfig({ graph, vertexPositions }), [
    graph,
    vertexPositions,
    updateConfig,
  ]);

  return {
    graphName,
    graph,
    vertexPositions,
    savedGraphUse,
    componentProps: { onSelectChange, value, names, refContainer },
    sketchUse,
  };
};

export default GraphPickerWithSketch;
