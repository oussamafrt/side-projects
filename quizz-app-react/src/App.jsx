import { useEffect, useState } from "react";
import "./App.css";
import Quizz from "./components/Quizz";
import { questions, moneyPyramid } from './data'
import Timer from "./components/Timer";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
  }, [questionNumber]);
  return (
    <div className="app">
      <div className="main">
        {stop ? ( <h1 className="endText">Tu remportes la somme de : {earned}</h1> ) : (
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
    </div>
  );
}

export default App;
