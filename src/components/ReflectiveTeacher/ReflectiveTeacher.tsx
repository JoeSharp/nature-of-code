import React from "react";
import AddReflection from "./AddReflection";
import ReflectionList from "./ReflectionList/ReflectionList";
import useReflections from "./useReflections";

const ReflectiveTeacher: React.FunctionComponent = () => {
  const reflections = useReflections();
  const { addItem } = reflections;

  return (
    <div>
      <h1>Reflective Teacher</h1>
      <AddReflection addReflection={addItem} />
      <ReflectionList useReflections={reflections} />
    </div>
  );
};

export default ReflectiveTeacher;
