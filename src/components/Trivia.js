import { useEffect, useState } from "react";
import Data from "./Data";
import useSound from "use-sound";

import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

const Trivia = ({
  setStop,
  questionNumber,
  setQuestionNumber,
  selectedAnswer,
  setSelectedAnswer,
  setIsPaused,
}) => {
  const [question, setQuestion] = useState(Data[questionNumber - 1]);

  const [className, setClassName] = useState("answer");
  const [disablePointer, setDisablePointer] = useState(false);

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  const handleClick = (answer) => {
    setIsPaused(true);
    setDisablePointer(true);
    setSelectedAnswer(answer);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(answer.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (answer.correct) {
        correctAnswer();
        delay(1000, () => {
          if (questionNumber == 15) return setStop(true);
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
          setDisablePointer(false);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  useEffect(() => {
    setQuestion(Data[questionNumber - 1]);
    setIsPaused(false);
  }, [questionNumber, setIsPaused]);
  return (
    <div className={disablePointer ? "trivia disableClick" : "trivia"}>
      <div className="question">{question.question}</div>
      <div className="answers">
        {question.answers.map((answer) => (
          <div
            className={selectedAnswer === answer ? className : "answer"}
            key={answer.text}
            onClick={() => handleClick(answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
