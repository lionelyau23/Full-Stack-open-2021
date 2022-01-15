import React from "react"

const Header = (prop) => {
  return (
    <h1>
      {prop.course}
    </h1>
  )
}

const Content = (prop) => {
  return (
    <p>
      <Part part={prop.parts[0]} exercise={prop.exercises[0]}/>
      <Part part={prop.parts[1]} exercise={prop.exercises[1]}/>
      <Part part={prop.parts[2]} exercise={prop.exercises[2]}/>
    </p>
  )
}

const Part = (prop) => {
  return (
    <p>
      {prop.part} {prop.exercise}
    </p>
  )
}

const Total = (prop) => {
  return (
    <p>
      Number of exercises {prop.total}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App;
