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

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={[part1.name, part2.name, part3.name]} exercises={[part1.exercises, part2.exercises, part3.exercises]}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App;
