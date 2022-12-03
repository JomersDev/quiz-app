import React, { useState, useEffect } from 'react'
import './App.css'
import Home from './Pages/Home'
import Quiz from './Pages/Quiz'
import {Route, Routes,} from "react-router-dom"
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'

export default function App() {

  //State for setting quiz data received from API call
  const [quizData, setQuizData] = useState([])

  const API = 'https://opentdb.com/api.php?amount=5&category=21&type=multiple'

  //API gets called on initial page load and saves the data received to state (quizData)
  useEffect(() => {
      fetch('https://opentdb.com/api.php?amount=5&category=21&type=multiple')
        .then(response => response.json())
        .then(data => setQuizData(data.results))
    },[])
  
  console.log(quizData)

  //Mapping over quizdata and rendering a Quiz component with the desired info as props
  const quizElements = quizData.map(question => (
    <Quiz
      //nanoId package to assign a unique ID to each element created 
      key={nanoid()} 
      id={nanoid()} 
      //decoding the data received to make it readable
      question={decode(question.question)}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
    />
  ))

  return (
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/start-quiz' element={<>{quizElements}<button>Check Answers</button></>}/>
      </Routes>
  )
}

