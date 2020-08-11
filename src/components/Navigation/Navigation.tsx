import React from "react";
import { Link } from "react-router-dom";
import { pages as csPages } from "../ComputerScience";
import { pages as mathsPages } from "../Maths";
import codeClubSessions from "../CodeClub";
import experiments from "../Experiments";
import { Page } from "src/types";

interface PageCollection {
  title: string;
  pages: Page[];
}

const pages: PageCollection[] = [
  { title: "Computer Science", pages: csPages },
  { title: "Maths", pages: mathsPages },
  { title: "Code Club", pages: codeClubSessions },
  { title: "Experiments", pages: experiments },
];

export default () => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link className="nav-link active" to="/">
        Joe's Experiments
      </Link>
    </li>

    {pages.map(({ title, pages }, i) => (
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
  </ul>
);
