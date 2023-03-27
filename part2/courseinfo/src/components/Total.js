export const Total = (props) => {
    const totalExercise = props.parts.reduce((accumulator, content) => accumulator + content.exercises, 0)
    return (
      <b>
        Total of {totalExercise} exercises
      </b>
    )
  };
  