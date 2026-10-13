import QuestionTimer from "./QuestionTimer";
import Answers from "./Answer";
import { useState } from "react";
import QUESTION from "../questions";
export default function Question({
  onSelectAnswer,
  onSkipAnswer,
  questionIndex,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }
  function handleSelectAnswer(sAnswer) {
    setTimeout(() => {
      setAnswer({
        selectedAnswer: sAnswer,
        isCorrect: null,
      });
      setAnswer({
        selectedAnswer: sAnswer,
        isCorrect: QUESTION[questionIndex].answers[0] === sAnswer,
      });
      setTimeout(() => {
        onSelectAnswer(sAnswer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  console.log(answer.isCorrect);
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        timeOut={timer}
        onTimeOut={answer.selectedAnswer ? onSkipAnswer : null}
        key={timer}
        mode={answerState}
      />

      <h2>{QUESTION[questionIndex].text}</h2>
      {console.log(answerState)}
      <Answers
        onSelect={handleSelectAnswer}
        selectedAnswer={answer.selectedAnswer}
        answers={QUESTION[questionIndex].answers}
        answerState={answerState}
      />
    </div>
  );
}
