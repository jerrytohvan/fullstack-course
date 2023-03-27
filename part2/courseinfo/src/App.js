import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = (props) => (
  <p>
    {props.part} {props.exercise}
  </p>
);

const Content = (props) => (
  props.parts.map(content => (
    <Part key={content.id} part={content.name} exercise={content.exercises} />
  )
  )
);

const Total = (props) => {
  const totalExercise = props.parts.reduce((accumulator, content) => accumulator + content.exercises, 0)
  return (
    <p>
      Number of exercises {totalExercise}
    </p>
  )
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/* <Total parts={course.parts} /> */}
    </>
  )
};


const App = () => {

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

export default App