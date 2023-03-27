const Part = (props) => (
    <p>
        {props.part} {props.exercise}
    </p>
);

export const Content = (props) => (
    props.parts.map(content => (
        <Part key={content.id} part={content.name} exercise={content.exercises} />
    )
    )
);