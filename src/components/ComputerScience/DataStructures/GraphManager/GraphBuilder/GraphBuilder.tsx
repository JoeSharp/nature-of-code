import React from "react";
import VertexRow from "./VertexRow";
import { UseGraphBuilder } from "./types";

import "./graphBuilder.css";
import { v4 as uuidv4 } from "uuid";
import { StringDataItem } from "src/components/p5/Boid/types";
import ButtonBar, {
  Props as ButtonBarProps,
} from "src/components/Bootstrap/Buttons/ButtonBar";

interface Props {
  graphBuilder: UseGraphBuilder<StringDataItem>;
}

const GraphBuilder: React.FunctionComponent<Props> = ({
  graphBuilder,
}: Props) => {
  const {
    version,
    graph,
    setNewEdgeWeight,
    newEdgeWeight,
    clearAll,
  } = graphBuilder;

  const [newVertexName, setNewVertexName] = React.useState<string>("Z");
  const onAddVertex = React.useCallback(() => {
    if (newVertexName.length > 0) {
      graph.addVertex({
        key: uuidv4(),
        label: newVertexName,
        value: newVertexName,
      });
    }
  }, [newVertexName, graph]);
  const onNewVertexChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewVertexName(value),
    [setNewVertexName]
  );

  const onNewEdgeWeightChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewEdgeWeight(parseInt(value)),
    [setNewEdgeWeight]
  );

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          onClick: onAddVertex,
          text: "Add Vertex",
          styleType: "primary",
        },
        {
          onClick: clearAll,
          text: "Clear All",
          styleType: "danger",
        },
      ],
    }),
    [clearAll, onAddVertex]
  );

  return (
    <div>
      <h2>Edit Graph (v{version})</h2>
      <form>
        <div className="form-group">
          <label htmlFor="newVertexName">New Vertex Name</label>
          <input
            id="newVertexName"
            className="form-control"
            value={newVertexName}
            onChange={onNewVertexChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newEdgeWeight">New Edge Weight</label>
          <input
            id="newEdgeWeight"
            className="form-control"
            type="number"
            value={newEdgeWeight}
            onChange={onNewEdgeWeightChange}
          />
        </div>
      </form>
      <ButtonBar {...buttonBarProps} />

      <table className="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th>Vertex</th>
            <th>Outgoing</th>
            <th>Incoming</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {graph.vertices.map((vertex, i) => (
            <VertexRow key={i} vertex={vertex} graphBuilder={graphBuilder} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GraphBuilder;
