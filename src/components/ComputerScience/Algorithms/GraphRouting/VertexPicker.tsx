import React from "react";
import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

export interface Props {
  className?: string;
  version: number;
  graph: Graph<string>;
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}

const VertexPicker: React.FunctionComponent<Props> = ({
  version,
  graph,
  value,
  onChange,
  className,
}) => {
  const findVertex = React.useCallback(
    (value) =>
      graph.vertices.find((vertex) => graph.vertexToString(vertex) === value),
    [graph]
  );

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(findVertex(value)),
    [onChange, findVertex]
  );

  React.useEffect(() => {
    if (findVertex(value) === undefined) {
      onChange(graph.vertices[0]);
    }
  }, [value, graph, onChange, findVertex]);

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option key={version} value={version} />
      {graph.vertices.map((vertex) => (
        <option key={vertex} value={vertex}>
          {vertex}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  vertex: string | undefined;
  componentProps: Props;
}

export const usePicker = (
  version: number,
  graph: Graph<string>,
  className?: string
): UsePicker => {
  const [value, onChange] = React.useState<string | undefined>(undefined);

  return {
    vertex: value,
    componentProps: {
      version,
      graph,
      className,
      value,
      onChange,
    },
  };
};

export default VertexPicker;
