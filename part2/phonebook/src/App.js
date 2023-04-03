import { useEffect, useState } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import { getAllPhonebook, addPhonebook, getPhonebook, deletePhonebook, patchPhonebook} from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newPhonebook, setNewPhonebook] = useState({
    name: '',
    number: ''
  });

  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    getAllPhonebook().then(persons => setPersons(persons));
  }, []);

  const refreshPhonebookInputs = (event) => {
    event.target[0].value = '' // Reinitialize name input
    event.target[1].value = '' // Reinitialize number input

    setNewPhonebook({
      name: '',
      number: ''
    });
  };

  const isPhonebookExists = () => {
    const existingPerson = persons.filter(person => person.name === newPhonebook.name);
    if (existingPerson.length > 0) return existingPerson[0];
    return null;
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
    const existingPhonebook = isPhonebookExists();
    if (existingPhonebook) {
      if(window.confirm(`${newPhonebook.name} is already added to phonebook, replace old number with a new one?`)){
        patchPhonebook({id: existingPhonebook.id, number: newPhonebook.number }).then(newPhonebook => {
          const updatedPersons = persons.map(person => {
            if(person.id === newPhonebook.id){
              return {
                ...person,
                number: newPhonebook.number
              }
            }
            return person;
          });
          setPersons([...updatedPersons]);
          refreshPhonebookInputs(event);
        })
      } 
    } else {
      addPhonebook(newPhonebook).then(
        newPerson => setPersons([...persons, newPerson])
      );
    }
    refreshPhonebookInputs(event);
  };

  const handleDeletion = (id) => {
    getPhonebook(id)
    .then(person => { 
      if(window.confirm(`Delete ${person.name}?`)){
        deletePhonebook(id).then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id));
        })
      }
    }).catch(error => {
      console.error(error);
      alert(`Phonebook ID: ${id} not found.`);
    }
    )
  }

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
      <Persons persons={getAllNames()} handleDeletion={handleDeletion} />
    </div>
  );
};

export default App;