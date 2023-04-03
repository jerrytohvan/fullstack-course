export const Persons = ({ persons, handleDeletion }) => {
    return persons.map(
        person =>
            <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => handleDeletion(person.id)}>delete</button>
            </div>
    );
}