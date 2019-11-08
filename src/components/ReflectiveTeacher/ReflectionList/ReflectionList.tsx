import React from "react";
import { UseReflections } from "../useReflections/types";

interface Props {
  useReflections: UseReflections;
}

const ReflectionList: React.FunctionComponent<Props> = ({
  useReflections: { items }
}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Group</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ date, group, content }) => (
          <tr>
            <td>{date}</td>
            <td>{group}</td>
            <th>{content}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReflectionList;
