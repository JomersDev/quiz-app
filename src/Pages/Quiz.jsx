import React, { useState } from "react";

export default function Quiz(props) {

    const [selectedAnswer, setSelectedAnswer] = useState("")

    //combining the incorrect and correct answer props into a single array
    let answersArray = [...props.incorrectAnswers, props.correctAnswer]

    function handleSelection(answer) {
        setSelectedAnswer(answer)
    }

    let answerList = answersArray.map((answer) => 
        <button 
            key={answer}
            className={answer === selectedAnswer ? "btn-answer selected" : "btn-answer"} 
            onClick={() => handleSelection(answer)}
        >
            {answer}
        </button>
    )

    console.log(selectedAnswer)

    return (
        <div>
            <p>{props.question}</p>
            <div>
                {answerList}
            </div>
        </div>
    )
}
