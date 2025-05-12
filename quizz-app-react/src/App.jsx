import { useEffect, useState } from "react";
import "./App.css";
import Quizz from "./components/Quizz";
import { questions, moneyPyramid } from './data'
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
  }, [questionNumber]);

  useEffect(() => {
    if (questionNumber > 15) {
      setStop(true);
    }
  }, [questionNumber]);

  const restartGame = () => {
    setQuestionNumber(1);
    setStop(false);
    setEarned("$ 0");
  };

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
        {stop ? (
          <div className="endGame">
            {questionNumber > 15 ? (
            <h1 className="endText">🎉 Bravo ! Vous êtes MILLIONNAIRE 💰</h1>
          ) : (
            <h1 className="endText">Vous remportez la somme de : {earned}</h1>
          )}
          <button className="restartButton" onClick={restartGame}>
            Rejouer
          </button>
          </div>
        ) : (
        <>
          <div className="top">
            <div className="timer">
              <Timer setStop={setStop} questionNumber={questionNumber}/>
            </div>
          </div>
          <div className="bottom">
            <Quizz 
              questions={questions} 
              setStop={setStop}
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
            />
          </div>
        </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
        </>
      ) : ( 
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
