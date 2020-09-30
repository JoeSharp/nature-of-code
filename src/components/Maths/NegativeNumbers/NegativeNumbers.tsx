import React from "react";
import useQuiz from "./useQuiz";
import ArithmeticOperationPicker, {
  usePicker,
} from "./ArithmeticOperationPicker";

import "./quizzes.css";

const NegativeNumbers: React.FunctionComponent = () => {
  const { componentProps, operation } = usePicker("form-control");

  const { quiz: quiz1, regenerateQuiz: regenerateQuiz1 } = useQuiz({
    partRange: 20,
    numberParts: 2,
    numberQuestions: 10,
    operation,
  });
  const { quiz: quiz2, regenerateQuiz: regenerateQuiz2 } = useQuiz({
    partRange: 30,
    numberParts: 3,
    numberQuestions: 10,
    operation,
  });

  const quizzes = [quiz1, quiz2];
  const regenerateQuizzes = React.useCallback(() => {
    regenerateQuiz1();
    regenerateQuiz2();
  }, [regenerateQuiz1, regenerateQuiz2]);

  let [revealAnswers, toggleRevealAnswer] = React.useReducer((a) => !a, false);

  let onClickToggleReveal = React.useCallback(() => toggleRevealAnswer(), [
    toggleRevealAnswer,
  ]);

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Arithmetic Operation</label>
          <ArithmeticOperationPicker {...componentProps} />
        </div>
      </form>

      <div className="quizzes">
        {quizzes.map((quiz, quizI) => (
          <div>
            <table>
              <tbody>
                {quiz.map(({ question, answer }, questionI) => (
                  <tr>
                    <td className="questionIndex">
                      {quizI + 1}.{questionI + 1})
                    </td>
                    <td>{question}</td>
                    <td>=</td>
                    <td>{revealAnswers ? answer : "?"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={onClickToggleReveal}>
        {revealAnswers ? "Hide Answers" : "Reveal Answers"}
      </button>
      <button className="btn btn-warning" onClick={regenerateQuizzes}>
        Regenerate
      </button>
    </div>
  );
};

export default NegativeNumbers;
