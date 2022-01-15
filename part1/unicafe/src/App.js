import React, { useState } from "react";

const DisplayHeading = ({text}) => (
  <h1>
    {text}
  </h1>
)

const DisplayStat = ({name, stat}) => (
  <div>
    {name} {stat}
  </div>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

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
      <Button onClick={setScore(1)} text={'good'}/>
      <Button onClick={setScore(0)} text={'neutral'}/>
      <Button onClick={setScore(-1)} text={'bad'}/>

      <DisplayHeading text={'statistics'} />
      <DisplayStat name={'good'} stat={good} />
      <DisplayStat name={'neutral'} stat={neutral} />
      <DisplayStat name={'bad'} stat={bad} />
      <DisplayStat name={'all'} stat={all} />
      <DisplayStat name={'average'} stat={average} />
      <DisplayStat name={'positive'} stat={''.concat(positive,' %')} />
    </div>
  )
}

export default App;
