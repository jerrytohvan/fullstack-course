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
   props.parts.map(content =>(
    <Part part={content.name} exercise={content.exercise}/>
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


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App