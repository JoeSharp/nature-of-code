import React from "react";

import usePageRank from "./usePageRank";
import CurrentRanksTable from "./CurrentRanksTable";
import RankHistoryTable from "./RankHistoryTable";
import InOrderList from "./InOrderList";
import { useToggledInterval } from "src/components/lib/useInterval";
import { simpleStringGraph } from "../../DataStructures/GraphComponent/cannedGraphs";
import Checkbox from "src/components/Bootstrap/Checkbox";
import useGraphSketch from "src/components/ComputerScience/DataStructures/GraphComponent/useGraphSketch";

const DEFAULT_DAMPING_FACTOR = 0.85;

const PageRank: React.FunctionComponent = () => {
  const [dampingFactor, setDampingFactor] = React.useState<number>(
    DEFAULT_DAMPING_FACTOR
  );

  const graph = React.useMemo(() => simpleStringGraph(), []);

  const { refContainer } = useGraphSketch(graph);

  const { iterations, ranks, rankHistory, begin, iterate } = usePageRank({
    dampingFactor,
    graph,
  });

  const onReset = React.useCallback(() => {
    begin();
    setDampingFactor(DEFAULT_DAMPING_FACTOR);
  }, [begin, setDampingFactor]);

  const onDampingFactorChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setDampingFactor(parseFloat(value)),
    [setDampingFactor]
  );

  const { isAutoIterating, onAutoIteratingChange } = useToggledInterval({
    iterate,
  });

  return (
    <div>
      <div ref={refContainer} />

      <h4>Page Ranks after {iterations} iterations</h4>
      <div>
        <button className="btn btn-primary" onClick={onReset}>
          Reset
        </button>
        <button className="btn btn-success" onClick={iterate}>
          Iterate
        </button>
        <div className="form-group">
          <label htmlFor="txtDampingFactor">Damping Factor</label>
          <input
            id="txtDampingFactor"
            className="form-control"
            type="number"
            min="0.1"
            max="2.0"
            step="0.01"
            value={dampingFactor}
            onChange={onDampingFactorChange}
          />
        </div>
        <Checkbox
          id="chkAutoIterate"
          label="Auto Iterate"
          checked={isAutoIterating}
          onChange={onAutoIteratingChange}
        />
      </div>
      <div className="row">
        <div className="col-md-8">
          <h2>Current Ranks</h2>
          <CurrentRanksTable pages={graph.vertices} ranks={ranks} />
        </div>
        <div className="col-md-4">
          <h2>In Order</h2>
          <InOrderList pages={graph.vertices} ranks={ranks} />
        </div>
      </div>
      <h2>All Iterations</h2>
      <RankHistoryTable pages={graph.vertices} rankHistory={rankHistory} />
    </div>
  );
};

export default PageRank;
