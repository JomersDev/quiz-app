import React from "react";
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
            <h1 className="title-primary">Quizzical</h1>
            <p className="title-secondary">Some description if needed</p>
            <Link to={"/start-quiz"}>
                <button className="btn">Start Quiz</button>
            </Link>
        </div>
    )
}