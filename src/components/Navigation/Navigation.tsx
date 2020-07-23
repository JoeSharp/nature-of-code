import * as React from "react";
import { Link } from "react-router-dom";
import codeClubSessions from "../CodeClub";
import experiments from "../Experiments";
import alevel from "../ALevel";

interface PageCollection {
  title: string;
  pages: Page[];
}

const pages: PageCollection[] = [
  { title: "A Level Computer Science", pages: alevel },
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

    {pages.map(({ title, pages }) => (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {title}
        </a>
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
