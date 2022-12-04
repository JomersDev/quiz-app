import React, { useState, useEffect } from "react";

export default function Quiz(props) {

    const [selectedAnswer, setSelectedAnswer] = useState("")
    //combining the incorrect and correct answer props into a single array and rearranging the order
    //const [answers, setAnswers] = useState(props.answerArray)

    //Set the selectedAnswer state the the option that the user has chosen
    function handleSelection(answer) {
        setSelectedAnswer(answer)
    }

    let answerList = props.answerArray.map((answer) => 
        <button 
            key={answer}
            className={`btn-answer ${answer === selectedAnswer ? "selected" : ""} 
                        ${answer === props.correctAnswer ? "correct" : ""}`}
            onClick={() => handleSelection(answer)}
        >
            {answer}
        </button>
    )
    
    return (
        <div>
            <p>{props.question}</p>
            <div>
                {answerList}
            </div>
        </div>
    )
}
