import React from "react";

const Course = ({courses}) => (
    <div>
        {courses.map(course => (
        <div key={course.id}>
            <Header key={course.id} text={course.name} />
            <Content parts={course.parts}/>
            <Total course={course}/>
        </div>
        ))}
    </div>
)

const Header = ({text}) => (
    <h2>
        {text}
    </h2>
)
  
const Content = ({parts}) => (
    <div>
        {parts.map(part =>
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
    </div>
)

const Part = ({name, exercises}) => (
    <p>
        {name} {exercises}
    </p>
)


const Total = ({course}) => (
    <p>
        <b>total of {course.parts.reduce((prev, curr) => prev + curr.exercises, 0)} exercises </b>
    </p>
)

export default Course