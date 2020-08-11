import React from "react";

interface Props {
  title: string;
  lead: string;
}

const Jumbotron: React.FunctionComponent<Props> = ({ title, lead }) => (
  <div className="jumbotron">
    <div className="container">
      <h1 className="display-4">{title}</h1>
      <p className="lead">{lead}</p>
    </div>
  </div>
);

export default Jumbotron;
