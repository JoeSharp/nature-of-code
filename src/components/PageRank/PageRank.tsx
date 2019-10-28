import React from "react";

import useBuildPages from "./useBuildPages";
import Page from "./Page";

const PageRank: React.FunctionComponent = () => {
  const buildPages = useBuildPages();

  return (
    <div className="container">
      <h1>Page Rank</h1>
      <div className="row">
        {buildPages.pageGraph.pages.map((page, i) => (
          <div className="col-sm-4" key={i}>
            <Page page={page} buildPages={buildPages} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageRank;
