import React from "react";
import Graph from "ocr-cs-alevel-ts/dist/dataStructures/graph/Graph";

export interface Props {
  className?: string;
  graph: Graph<string>;
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}

const VertexPicker: React.FunctionComponent<Props> = ({
  graph: { vertices },
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) =>
      onChange(vertices.find((vertex) => vertex === value)),
    [onChange, vertices]
  );

  React.useEffect(() => onChange(vertices[0]), [vertices, onChange]);

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option />
      {vertices.map((vertex) => (
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
  graph: Graph<string>,
  className?: string
): UsePicker => {
  const [value, onChange] = React.useState<string | undefined>(undefined);

  return {
    vertex: value,
    componentProps: {
      graph,
      className,
      value,
      onChange,
    },
  };
};

export default VertexPicker;
