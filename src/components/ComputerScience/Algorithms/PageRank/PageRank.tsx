import React from "react";

import usePageRank from "./usePageRank";
import CurrentRanksTable from "./CurrentRanksTable";
import RankHistoryTable from "./RankHistoryTable";
import InOrderList from "./InOrderList";
import { useToggledInterval } from "src/components/lib/useInterval";
import GraphBuilder, {
  useGraphBuilder,
} from "src/components/ComputerScience/GraphBuilder";

const DEFAULT_DAMPING_FACTOR = 0.85;

const PageRank: React.FunctionComponent = () => {
  const [dampingFactor, setDampingFactor] = React.useState<number>(
    DEFAULT_DAMPING_FACTOR
  );
  const graphBuilderProps = useGraphBuilder({});
  const {
    buildGraph: { graph },
  } = graphBuilderProps;
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

  const {
    isAutoIterating,
    onChange: onAutoIterateChange,
  } = useToggledInterval({ iterate });

  return (
    <div className="container">
      <h1>Page Rank</h1>
      <div>
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isAutoIterating}
              onChange={onAutoIterateChange}
              id="chkAutoIterate"
            />
            <label className="form-check-label" htmlFor="chkAutoIterate">
              Auto Iterate
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h2>Current Ranks</h2>
            <CurrentRanksTable pages={graph.vertices} ranks={ranks} />
          </div>
          <div className="col-md-4">
            <h2>In Order</h2>
            <InOrderList {...{ ranks }} />
          </div>
        </div>
        <h2>All Iterations</h2>
        <RankHistoryTable pages={graph.vertices} rankHistory={rankHistory} />

        <GraphBuilder {...graphBuilderProps} />
      </div>
    </div>
  );
};

export default PageRank;
