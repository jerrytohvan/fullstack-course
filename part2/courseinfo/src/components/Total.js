export const Total = (props) => {
    const totalExercise = props.parts.reduce((accumulator, content) => accumulator + content.exercises, 0)
    return (
      <p>
        Number of exercises {totalExercise}
      </p>
    )
  };
  