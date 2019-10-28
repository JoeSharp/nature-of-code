import React from "react";

import { Link, UseBuildPages } from "./types";

interface Props {
  page: string;
  buildPages: UseBuildPages;
}

interface LinkWithHandler {
  link: Link;
  onRemove: () => void;
}

interface LinksProps {
  getOtherEnd: (link: Link) => void;
  links: LinkWithHandler[];
}

const Links: React.FunctionComponent<LinksProps> = ({ links, getOtherEnd }) => {
  return (
    <ul>
      {links.map(({ link, onRemove }, i) => (
        <li key={i}>
          {getOtherEnd(link)}{" "}
          <button className="btn btn-danger btn-sm" onClick={onRemove}>
            Remove Link
          </button>
        </li>
      ))}
    </ul>
  );
};

interface UseLinksWithHandlers {
  links: Link[];
  removeLink: (from: string, to: string) => void;
  filter: (link: Link) => boolean;
}

const useLinksWithHandlers = ({
  links,
  removeLink,
  filter
}: UseLinksWithHandlers) =>
  React.useMemo(
    () =>
      links.filter(filter).map(link => ({
        link,
        onRemove: () => removeLink(link.from, link.to)
      })),
    [filter, links, removeLink]
  );

const GET_LINK_FROM = (link: Link) => link.from;
const GET_LINK_TO = (link: Link) => link.to;

const Page: React.FunctionComponent<Props> = ({
  page,
  buildPages: {
    pageGraphBuilder: {
      pendingFrom,
      graph: { links }
    },
    prepareLink,
    cancelLink,
    completeLink,
    removePage,
    removeLink
  }
}) => {
  const onPrepareLink = React.useCallback(() => prepareLink(page), [
    page,
    prepareLink
  ]);
  const onCompleteLink = React.useCallback(() => completeLink(page), [
    page,
    completeLink
  ]);
  const onCancelLink = React.useCallback(() => cancelLink(), [
    page,
    prepareLink
  ]);
  const onRemovePage = React.useCallback(() => removePage(page), [
    page,
    removePage
  ]);

  const filterOutgoing = React.useCallback((link: Link) => link.from === page, [
    page
  ]);
  const filterIncoming = React.useCallback((link: Link) => link.to === page, [
    page
  ]);
  const outgoingLinks = useLinksWithHandlers({
    links,
    removeLink,
    filter: filterOutgoing
  });
  const incomingLinks = useLinksWithHandlers({
    links,
    removeLink,
    filter: filterIncoming
  });

  return (
    <div className="card">
      <div className="card-header">{page}</div>
      <div className="card-body">
        {outgoingLinks.length > 0 && (
          <React.Fragment>
            <h4>Outgoing</h4>
            <Links getOtherEnd={GET_LINK_TO} links={outgoingLinks} />
          </React.Fragment>
        )}
        {incomingLinks.length > 0 && (
          <React.Fragment>
            <h4>Incoming</h4>
            <Links getOtherEnd={GET_LINK_FROM} links={incomingLinks} />
          </React.Fragment>
        )}
        {outgoingLinks.length === 0 && incomingLinks.length === 0 && (
          <span>No Incoming or Outgoing Links</span>
        )}
      </div>
      <div className="card-footer">
        {pendingFrom === undefined && (
          <button className="btn btn-sm btn-primary" onClick={onPrepareLink}>
            Link From
          </button>
        )}
        {pendingFrom !== undefined && pendingFrom !== page && (
          <button className="btn btn-sm btn-success" onClick={onCompleteLink}>
            Link To
          </button>
        )}
        {pendingFrom === page && (
          <button className="btn btn-sm btn-warning" onClick={onCancelLink}>
            Cancel Link
          </button>
        )}
        <button className="btn btn-sm btn-danger" onClick={onRemovePage}>
          Remove Page
        </button>
      </div>
    </div>
  );
};

export default Page;
