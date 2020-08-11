import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  href: string;
}

const Card: React.FunctionComponent<Props> = ({ title, description, href }) => (
  <div className="card h-100">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <Link to={href} className="btn btn-primary">
        Try it
      </Link>
    </div>
  </div>
);
export default Card;
