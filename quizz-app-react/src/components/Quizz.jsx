import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
import wait from "../sounds/wait.mp3";

export default function Quizz({questions, setStop, questionNumber, setQuestionNumber}) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [playSound] = useSound(play);
    const [playCorrect] = useSound(correct);
    const [playWrong] = useSound(wrong);
    const [playWait, { stop: stopWait }] = useSound(wait, { loop: true });

    useEffect(() => {
        playSound();
    }, [playSound]);

    useEffect(() => {
        setQuestion(questions[questionNumber - 1])
    },[questions, questionNumber]);

    useEffect(() => {
        if (!selectedAnswer) {
            playWait();
        }
    }, [questionNumber, selectedAnswer, playWait]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    const handleClick = (a) => {
        stopWait();
        setSelectedAnswer(a);
        setClassName("answer active");
        delay(1000, () => 
            setClassName(a.isCorrect ? "answer correct" : "answer wrong")
        );
        delay(3000, () => 
        {
            if (a.isCorrect){
                playCorrect();
                delay(1000, ()=>{
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                });
            } else {
                playWrong();
                delay(1000, () => {
                    setStop(true);
                })
            }
        });
    }

    return (
        <div className="quizz">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => (
                    <div className={selectedAnswer === a ? className : "answer"} onClick={() => handleClick(a)}>{a.text}</div>
                ))}
            </div>
        </div>
    )
}