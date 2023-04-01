import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: uuidv1(),
      name: 'Arto Hellas'
    }
  ]);

  const [newPhonebook, setNewPhonebook] = useState({
    name: '',
    number: ''
  });


  const isPhonebookExists = () => {
    const existingPerson = persons.filter(person => person.name === newPhonebook.name);
    return existingPerson.length > 0;
  };

  const handleInputChange = (event) => {
    if (event.target.id === 'name') {
      setNewPhonebook({ ...newPhonebook, name: event.target.value });
    }
    if (event.target.id === 'number') {
      setNewPhonebook({ ...newPhonebook, number: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPhonebookExists()) {
      alert(`${newPhonebook.name} is already added to phonebook`);
    } else {
      setPersons([...persons, {
        id: uuidv1(),
        ...newPhonebook
      }]);
    }
    event.target[0].value = '' // Reinitialize name input
    event.target[1].value = '' // Reinitialize number input

    setNewPhonebook({
      name: '',
      number: ''
    });
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" id='name' onChange={handleInputChange} />
        </div>
        <div>
          number: <input type="text" id='number' onChange={handleInputChange} />
        </div>
        <>
          debug: {
            `${newPhonebook.name} ${newPhonebook.number}`
          }
        </>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <div key={person.id}><p>{person.name}</p></div>)
      }
    </div>
  );
};

export default App;