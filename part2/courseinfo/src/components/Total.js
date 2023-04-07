export const Total = (props) => {
    const totalExercises = props.parts.reduce((accumulator, content) => accumulator + content.exercises, 0)
    return (
      <b>
        Total of {totalExercises} exercises
      </b>
    )
  };
  