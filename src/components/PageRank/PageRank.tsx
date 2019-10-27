import React from "react";

import usePageRank from "./usePageRank";
import Page from "./Page";

const PageRank: React.FunctionComponent = () => {
  const {
    pageGraph: { pendingFrom, pages, links },
    prepareLink,
    cancelLink,
    completeLink,
    removePage,
    removeLink
  } = usePageRank();

  const pagesWithHandlers = React.useMemo(
    () =>
      pages.map(page => ({
        page,
        onPrepareLink: () => prepareLink(page),
        onCancelLink: () => cancelLink(),
        onCompleteLink: () => completeLink(page),
        onRemove: () => removePage(page)
      })),
    [pages, removePage]
  );

  const linksWithHandlers = React.useMemo(
    () =>
      links.map(link => ({
        link,
        onRemove: () => removeLink(link.from, link.to)
      })),
    [links, removeLink]
  );

  return (
    <div className="container">
      <h1>Page Rank</h1>
      <div className="row">
        {pagesWithHandlers.map((pageProps, i) => (
          <div className="col-sm-4" key={i}>
            <Page pendingFrom={pendingFrom} {...pageProps} />
          </div>
        ))}
      </div>
      <ul>
        {linksWithHandlers.map(({ link: { from, to }, onRemove }, i) => (
          <li key={i}>
            {from} - {to} <button onClick={onRemove}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageRank;
