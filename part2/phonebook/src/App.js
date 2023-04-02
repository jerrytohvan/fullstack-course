import { useEffect, useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([

  ]);

  const [newPhonebook, setNewPhonebook] = useState({
    name: '',
    number: ''
  });

  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    console.log('Initializing /persons');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      });
  }, []);

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
      <Filter handleInputChange={handleInputChange} />

      <h2>Add a new</h2>
      <PersonForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Persons persons={getAllNames()} />
    </div>
  );
};

export default App;