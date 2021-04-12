import React from "react";

export interface Tab {
  title: string;
  content: React.ReactElement;
}

interface Props {
  tabs: Tab[];
}

const Tabs: React.FunctionComponent<Props> = ({ tabs }) => {
  const [selectedTitle, setSelectedTitle] = React.useState<string>();

  const tabsWithHandlers = React.useMemo(
    () =>
      tabs.map((tab) => ({
        tab,
        onSelect: () => setSelectedTitle(tab.title),
      })),
    [tabs, setSelectedTitle]
  );

  return (
    <React.Fragment>
      <ul className="nav nav-tabs">
        {tabsWithHandlers.map(({ onSelect, tab: { title } }) => (
          <li className="nav-item">
            <button
              onClick={onSelect}
              className={`nav-link ${title === selectedTitle ? "active" : ""}`}
              aria-current="page"
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
      {tabs
        .filter(({ title }) => title === selectedTitle)
        .map(({ title, content }) => (
          <React.Fragment key={title}>{content}</React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Tabs;
