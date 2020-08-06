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
      <option key={version} value={version} />
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
