import React, { useState } from "react";

const DisplayHeading = ({text}) => (
  <h1>
    {text}
  </h1>
)

// const StatisticLine = ({text, stat}) => (
//   <div>
//     {text} {stat}
//   </div>
// )

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
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{all}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{average.toFixed(1)}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{positive.toFixed(1)} %</td>
            </tr>
          </tbody>
        </table>
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
