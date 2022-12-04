import React, { useState, useEffect } from 'react'
import './App.css'
import Quiz from './Pages/Quiz'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'

export default function App() {

  //State for setting quiz data received from API call
  const [quizData, setQuizData] = useState([])
  const [isGameStart, setIsGameStart] = useState(false)
  const [correctTally, setCorrectTally] = useState(0)

  const API = 'https://opentdb.com/api.php?amount=5&category=21&type=multiple'

  //API gets called on initial page load and saves the data received to state (quizData)
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=21&type=multiple')
      .then(response => response.json())
      .then(data => setQuizData(data.results.map(question => {
        return {
          question: question.question,
          correctAnswer: question.correct_answer,
          incorrectAnswers: question.incorrect_answers,
          answerArray: [...question.incorrect_answers, question.correct_answer].sort((a,b) => 0.5 - Math.random())
        }
      })))
  },[])

  function checkHowManyCorrect() {
    setCorrectTally(document.querySelectorAll('.selected.correct').length)
  }
  
  console.log(quizData)

  //Mapping over quizdata and rendering a Quiz component with the desired info as props
  const quizElements = quizData.map(question => (
    <Quiz
      //nanoId package to assign a unique ID to each element created 
      key={nanoid()} 
      id={nanoid()} 
      //decoding the data received to make it readable
      question={decode(question.question)}
      correctAnswer={question.correctAnswer}
      incorrectAnswers={question.incorrectAnswers}
      answerArray={question.answerArray}
    />
  ))


  //conditionally render the quizElements once the user clicks on start quiz
  return (
    <div>
      {isGameStart ? 
        <div>
          {quizElements}
          <button onClick={() => checkHowManyCorrect()}>Check Answers</button>
          <p>You got {correctTally}/5 correct</p>
        </div> 
        :    
        <div className="home-container">
          <h1 className="title-primary">Quizzical</h1>
          <p className="title-secondary">Some description if needed</p>
          <button className="btn" onClick={() => setIsGameStart(prev => !prev)}>Start Quiz</button>
        </div> 
      }
    </div>
  )
}
