import React, { ChangeEventHandler } from "react";

import useBuildPages from "./useBuildPages";
import usePageRank from "./usePageRank";
import Page from "./Page";
import CurrentRanksTable from "./CurrentRanksTable";
import RankHistoryTable from "./RankHistoryTable";
import InOrderList from "./InOrderList";
import useInterval from "./useInterval";

const DEFAULT_DAMPING_FACTOR = 0.85;

const PageRank: React.FunctionComponent = () => {
  const [dampingFactor, setDampingFactor] = React.useState<number>(
    DEFAULT_DAMPING_FACTOR
  );
  const buildPages = useBuildPages();
  const {
    pageGraphBuilder: {
      graph: { pages }
    },
    clearAll,
    addPage
  } = buildPages;
  const { iterations, ranks, rankHistory, begin, iterate } = usePageRank({
    dampingFactor,
    graph: buildPages.pageGraphBuilder.graph
  });
  const [newPageName, setNewPageName] = React.useState<string>(
    "www.somewhere.com"
  );
  const onReset = React.useCallback(() => {
    begin();
    setDampingFactor(DEFAULT_DAMPING_FACTOR);
  }, [begin, setDampingFactor]);
  const onAddPage = React.useCallback(
    () => newPageName.length > 0 && addPage(newPageName),
    [newPageName, addPage]
  );
  const onDampingFactorChange: ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(
    ({ target: { value } }) => setDampingFactor(parseFloat(value)),
    [setDampingFactor]
  );

  const onNewPageChange: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(({ target: { value } }) => setNewPageName(value), [
    setNewPageName
  ]);

  const [isAutoIterating, setIsAutoIterating] = React.useState<boolean>(false);

  const onAutoIterateChange: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(
    ({ target: { checked } }) => setIsAutoIterating(checked),
    [setIsAutoIterating]
  );

  const autoIterate = React.useCallback(() => isAutoIterating && iterate(), [
    isAutoIterating,
    iterate
  ]);

  useInterval(autoIterate, 1000);

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
            <CurrentRanksTable {...{ pages, ranks }} />
          </div>
          <div className="col-md-4">
            <h2>In Order</h2>
            <InOrderList {...{ ranks }} />
          </div>
        </div>
        <h2>All Iterations</h2>
        <RankHistoryTable {...{ pages, rankHistory }} />
      </div>
      <h2>Build Graph of Pages</h2>
      <form>
        <div className="form-group">
          <label htmlFor="newPageName">New Page Name</label>
          <input
            id="newPageName"
            className="form-control"
            value={newPageName}
            onChange={onNewPageChange}
          />
        </div>
      </form>
      <button className="btn btn-primary" onClick={onAddPage}>
        Add Page
      </button>
      <button className="btn btn-danger" onClick={clearAll}>
        Clear All
      </button>
      <div className="row">
        {pages.map((page, i) => (
          <div className="col-sm-4" key={i}>
            <Page page={page} buildPages={buildPages} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageRank;
