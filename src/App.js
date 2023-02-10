import { useState, useEffect, useMemo } from "react";
import "./App.css";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");
  const [stop, setStop] = useState(false);
  const [username, setUsername] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [amount, setAmount] = useState("$ 0");

  const moneyPyramid = useMemo(
    () =>
      [
        { id: "1", amount: "$ 100" },
        { id: "2", amount: "$ 200" },
        { id: "3", amount: "$ 500" },
        { id: "4", amount: "$ 1000" },
        { id: "5", amount: "$ 3000" },
        { id: "6", amount: "$ 5000" },
        { id: "7", amount: "$ 10000" },
        { id: "8", amount: "$ 12500" },
        { id: "9", amount: "$ 15000" },
        { id: "10", amount: "$ 20000" },
        { id: "11", amount: "$ 25000" },
        { id: "12", amount: "$ 30000" },
        { id: "13", amount: "$ 42500" },
        { id: "14", amount: "$ 50000" },
        { id: "15", amount: "$ 100000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      questionNumber != 15 &&
      setEarned(moneyPyramid.find((el) => el.id == questionNumber - 1).amount);
    questionNumber > 1 &&
      setAmount(moneyPyramid.find((el) => el.id == questionNumber - 1).amount);

    questionNumber == 15 &&
      setEarned(moneyPyramid.find((el) => el.id == questionNumber).amount);
  }, [questionNumber, moneyPyramid]);
  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername}></Start>
      ) : (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">
                Congrats {username} you have Earned {earned}
              </h1>
            ) : (
              <>
                <div className="top">
                  <div className="topCount">
                    <h1 className=" header_title">Amount earned : {amount}</h1>
                  </div>
                  <div className="timer">
                    <Timer
                      isPaused={isPaused}
                      setStop={setStop}
                      questionNumber={questionNumber}
                      selectedAnswer={selectedAnswer}
                    ></Timer>
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    setIsPaused={setIsPaused}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  ></Trivia>
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((item) => (
                <li
                  className={
                    questionNumber == item.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                  key={item.id}
                >
                  <span className="moneyListItemNumber">{`${item.id}.`} </span>
                  <span className="moneyListItemAmout">{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
