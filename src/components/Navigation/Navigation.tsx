import React from "react";
import { Link, useHistory } from "react-router-dom";
import codeClubSessions from "../CodeClub";
import experiments from "../Experiments";
import { Page } from "src/types";
import SearchBox from "../SearchBox/SearchBox";
import { pages as csPages } from "../ComputerScience";
import { pages as mathsPages } from "../Maths";

interface PageCollection {
  title: string;
  pages: Page[];
}

export const pages: Page[] = [
  ...codeClubSessions,
  ...experiments,
  ...csPages,
  ...mathsPages,
];

const pageSections: PageCollection[] = [
  { title: "Computer Science", pages: csPages },
  { title: "Maths", pages: mathsPages },
  { title: "Code Club", pages: codeClubSessions },
  { title: "Experiments", pages: experiments },
];

export default () => {
  const history = useHistory();

  const pageSelected = React.useCallback(
    ({ href }: Page) => history.push(href),
    [history]
  );
  const pageFilter = React.useCallback(
    ({ title, description }: Page, criteria: string) =>
      title.toLocaleLowerCase().includes(criteria.toLocaleLowerCase()) ||
      (description !== undefined && description.includes(criteria)),
    []
  );
  const pageToString = React.useCallback((p: Page) => p.title, []);

  return (
    <ul className="nav nav-tabs navbar-expand-lg navbar-light bg-light">
      <li className="nav-item">
        <Link className="nav-link active" to="/">
          Joe's Experiments
        </Link>
      </li>

      {pageSections.map(({ title, pages }, i) => (
        <li key={i} className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {title}
          </button>
          <div className="dropdown-menu">
            {pages.map(({ href, title }) => (
              <Link key={title} className="dropdown-item" to={href}>
                {title}
              </Link>
            ))}
          </div>
        </li>
      ))}

      <SearchBox
        items={pages}
        itemChosen={pageSelected}
        filter={pageFilter}
        itemToString={pageToString}
      />
    </ul>
  );
};
