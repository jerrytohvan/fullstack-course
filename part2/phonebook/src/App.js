import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: uuidv1() },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: uuidv1() },
    { name: 'Dan Abramov', number: '12-43-234345', id: uuidv1() },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: uuidv1() }
  ]);

  const [newPhonebook, setNewPhonebook] = useState({
    name: '',
    number: ''
  });

  const [filterName, setFilterName] = useState('');

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
    if (event.target.id === 'filter') {
      setFilterName(event.target.value);
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

  const getAllNames = () => {
    if (filterName === '') return persons;
    return persons.filter(person => person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase()));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with a: <input type="text" id='filter' onChange={handleInputChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" id='name' onChange={handleInputChange} />
        </div>
        <div>
          number: <input type="text" id='number' onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        getAllNames().map(person => <div key={person.id}><p>{person.name} {person.number}</p></div>)
      }
    </div>
  );
};

export default App;