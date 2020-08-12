import React from "react";
import { useHistory, Link } from "react-router-dom";
import codeClubSessions from "../CodeClub";
import experiments from "../Experiments";
import { Page } from "src/types";
import SearchBox from "../SearchBox/SearchBox";
import { page as csPage, pages as csPages } from "../ComputerScience";
import { page as mathsPage, pages as mathsPages } from "../Maths";
import Jumbotron from "../Bootstrap/Jumbotron";
import CardCollection from "../Bootstrap/CardCollection";

interface Props {
  location: string;
}

const cards = [csPage, mathsPage];

const HomePage: React.FunctionComponent = () => (
  <CardCollection cards={cards} />
);

const homePage: Page = {
  title: "Computer Science and Maths",
  description: `This site contains interactive demonstrations of various algorithms 
    and data structures used in Maths and Computer Science up to A Level.`,
  href: "/",
  component: HomePage,
};

export const pages: Page[] = [
  homePage,
  ...codeClubSessions,
  ...experiments,
  ...csPages,
  ...mathsPages,
];

const Navigation: React.FunctionComponent<Props> = ({ location }) => {
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

  const thisPage = React.useMemo(
    () => pages.find(({ href }) => href === location),
    [location]
  );
  return (
    <React.Fragment>
      <div className="navbar justify-content-between">
        <ol className="breadcrumb mr-auto">
          <Link className="breadcrumb-item" to="/">
            Joe's Experiments
          </Link>
          {location.includes(csPage.href + "/") && (
            <Link className="breadcrumb-item" to={csPage.href}>
              Computer Science
            </Link>
          )}
          {location.includes(mathsPage.href + "/") && (
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
      {thisPage && (
        <Jumbotron title={thisPage.title} lead={thisPage.description} />
      )}
    </React.Fragment>
  );
};

export default Navigation;
