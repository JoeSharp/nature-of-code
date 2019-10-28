import React from "react";

import useBuildPages from "./useBuildPages";
import usePageRank, { roundTo2Dp } from "./usePageRank";
import Page from "./Page";
import useInterval from "./useInterval";

const PageRank: React.FunctionComponent = () => {
  const buildPages = useBuildPages();
  const {
    pageGraphBuilder: {
      graph: { pages }
    },
    clearAll,
    addPage
  } = buildPages;
  const { iterations, ranks, begin, iterate } = usePageRank({
    graph: buildPages.pageGraphBuilder.graph
  });
  const [newPageName, setNewPageName] = React.useState<string>(
    "www.somewhere.com"
  );
  const onAddPage = React.useCallback(
    () => newPageName.length > 0 && addPage(newPageName),
    [newPageName, addPage]
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
          <button className="btn btn-primary" onClick={begin}>
            Reset
          </button>
          <button className="btn btn-success" onClick={iterate}>
            Iterate
          </button>
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
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Page</th>
              <th style={{ width: "20%" }}>Rank (2 d.p)</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(page => (
              <tr key={page}>
                <td>{page}</td>
                <td>{roundTo2Dp(ranks[page])}</td>
                <td>{ranks[page]}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
