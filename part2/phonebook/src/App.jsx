import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personService from './services/personService.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then((data) => setPersons(data))
      .catch((err) => console.log(err))
  }
  useEffect(hook, []);
  
  const handleAddNewPerson = (e) => {
    e.preventDefault();
    if(!personExists(newName)){
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
      personService
        .addPerson(newPerson)
        .then((returnedData) => {
          setPersons(persons.concat(returnedData));
          setNewName('');
          setNewNumber('');
        })
        .catch((err) => console.log(err))

      
    }else{
      alert(`${newName} already exists!`);
    }

  }
  const personExists = (personName) => {
    return persons.reduce((exists, person) => {
      if(person.name.toLowerCase() === personName.toLowerCase()){
        return true;
      }
    }, false)
  }

  return (
    <div>
      <Filter search={search} setSearch={setSearch}/>
      
      <PersonForm 
        handleAddNewPerson={handleAddNewPerson} 
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber} 
      />

      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App