import React from "react";
import { useHistory, Link } from "react-router-dom";
import codeClubSessions from "../CodeClub";
import experiments from "../Experiments";
import { Page } from "src/types";
import SearchBox from "../SearchBox/SearchBox";
import { page as csPage, pages as csPages } from "../ComputerScience";
import { page as mathsPage, pages as mathsPages } from "../Maths";

export const pages: Page[] = [
  ...codeClubSessions,
  ...experiments,
  ...csPages,
  ...mathsPages,
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

  console.log("Where are we", history.location.pathname);
  const thisPage = React.useMemo(
    () => pages.find(({ href }) => href === history.location.pathname),
    [history.location.pathname]
  );

  return (
    <React.Fragment>
      <div className="navbar justify-content-between">
        <ol className="breadcrumb mr-auto">
          <Link className="breadcrumb-item" to="/">
            Joe's Experiments
          </Link>
          {history.location.pathname.includes(csPage.href + "/") && (
            <Link className="breadcrumb-item" to={csPage.href}>
              Computer Science
            </Link>
          )}
          {history.location.pathname.includes(mathsPage.href + "/") && (
            <Link className="breadcrumb-item" to={mathsPage.href}>
              Maths
            </Link>
          )}
          {thisPage !== undefined && (
            <li className="breadcrumb-item active" aria-current="page">
              {thisPage.title}
            </li>
          )}
        </ol>
        <SearchBox
          items={pages}
          itemChosen={pageSelected}
          filter={pageFilter}
          itemToString={pageToString}
        />
      </div>
    </React.Fragment>
  );

  // return (
  //   <nav
  //     className="nav nav-tabs navbar-expand-lg navbar-light bg-light"
  //     aria-label="breadcrumb"
  //   >
  // <ol className="breadcrumb">
  //   <Link className="breadcrumb-item" to="/">
  //     Joe's Experiments
  //   </Link>
  //   <li className="breadcrumb-item">
  //     <a href="#">Library</a>
  //   </li>
  //   <li className="breadcrumb-item active" aria-current="page">
  //     Data
  //   </li>
  // </ol>
  //     <SearchBox
  //       items={pages}
  //       itemChosen={pageSelected}
  //       filter={pageFilter}
  //       itemToString={pageToString}
  //     />
  //   </nav>
  // );
};
