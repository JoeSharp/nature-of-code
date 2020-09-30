import React from "react";
import { ArithemeticOperation } from "./arithmeticOperations";

export interface Question {
  question: string;
  answer: number;
}

export interface Props {
  partRange: number;
  numberParts: number;
  numberQuestions: number;
  operation: ArithemeticOperation;
}

export interface UseQuiz {
  quiz: Question[];
  regenerateQuiz: () => void;
}

const useQuiz = ({
  partRange,
  numberParts,
  numberQuestions,
  operation: { getParts, symbol, reducer },
}: Props) => {
  const [quiz, regenerateQuiz] = React.useReducer((a) => {
    let questions: Question[] = [];

    for (let x = 0; x < numberQuestions; x++) {
      let parts: number[] = getParts(numberParts, partRange);
      questions.push({
        question: parts
          .map((p) => (p > 0 ? p.toString() : `(${p.toString()})`))
          .join(` ${symbol} `),
        answer: parts.reduce(reducer),
      });
    }

    return questions;
  }, []);

  React.useEffect(() => regenerateQuiz(), [
    regenerateQuiz,
    getParts,
    symbol,
    numberParts,
    partRange,
    numberQuestions,
  ]);

  return { quiz, regenerateQuiz };
};

export default useQuiz;
