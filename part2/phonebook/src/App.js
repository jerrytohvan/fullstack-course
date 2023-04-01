import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: uuidv1(),
      name: 'Arto Hellas'
    }
  ]);

  const [newName, setNewName] = useState('');

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersons([...persons, {
      id: uuidv1(),
      name: newName
    }]);
    event.target[0].value = '' // Reinitialize name input
    setNewName('');
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" onChange={handleInputChange} />
        </div>
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