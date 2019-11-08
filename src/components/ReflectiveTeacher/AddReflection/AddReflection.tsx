import React, { ChangeEventHandler } from "react";
import { Reflection } from "../useReflections/types";

interface Props {
  addReflection: (reflection: Reflection) => void;
}

const AddReflection: React.FunctionComponent<Props> = ({ addReflection }) => {
  const [group, setGroup] = React.useState("7S2");
  const onGroupChange: ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setGroup(value),
    [setGroup]
  );

  const [date, setDate] = React.useState("Tue 6th Nov");
  const onDateChange: ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setDate(value),
    [setDate]
  );

  const [content, setContent] = React.useState("Some stuff here!");
  const onContentChange: ChangeEventHandler<
    HTMLTextAreaElement
  > = React.useCallback(({ target: { value } }) => setContent(value), [
    setContent
  ]);

  const onAdd = React.useCallback(
    () => addReflection({ group, date, content }),
    [group, date, content, addReflection]
  );

  return (
    <div>
      <h2>Add Reflection</h2>
      <form>
        <div className="form-group">
          <label htmlFor="group">Group</label>
          <input
            id="group"
            className="form-control"
            value={group}
            onChange={onGroupChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            className="form-control"
            type="date"
            value={date}
            onChange={onDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="form-control"
            value={content}
            onChange={onContentChange}
          />
        </div>
      </form>
      <button className="btn btn-primary" onClick={onAdd}>
        Add
      </button>
    </div>
  );
};

export default AddReflection;
