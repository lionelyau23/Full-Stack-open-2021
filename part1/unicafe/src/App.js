import React, { useState } from "react";

const DisplayHeading = ({text}) => (
  <h1>
    {text}
  </h1>
)

const StatisticLine = ({text, stat}) => (
  <div>
    {text} {stat}
  </div>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if (all === 0) {
    return (
      <div>
        <DisplayHeading text={'statistics'} />
        <div>No feedback given</div>
      </div>
    )
  } else {
    return (
      <div>
        <DisplayHeading text={'statistics'} />
        <StatisticLine text={'good'} stat={good} />
        <StatisticLine text={'neutral'} stat={neutral} />
        <StatisticLine text={'bad'} stat={bad} />
        <StatisticLine text={'all'} stat={all} />
        <StatisticLine text={'average'} stat={average} />
        <StatisticLine text={'positive'} stat={''.concat(positive,' %')} />
      </div>
    )  
  }
  
}

const Buttons = ({setScore}) => (
  <div>
    <button onClick={setScore(1)}> good </button>
    <button onClick={setScore(0)}> neutral </button>
    <button onClick={setScore(-1)}> bad </button>
  </div>
)

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setScore = (score) => () => {
    if (score === 1) {
      setGood(good + 1)
    } else if (score === 0) {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <DisplayHeading text={'give feedback'} />
      <Buttons setScore={setScore}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
