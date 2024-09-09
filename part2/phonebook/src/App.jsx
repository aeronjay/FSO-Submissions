import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    axios.get("http://localhost:3001/persons")
    .then((response) => {
      setPersons(response.data)
    })
  }
  useEffect(hook, []);
  
  const handleAddNewPerson = (e) => {
    e.preventDefault();    
    if(!personExists(newName)){
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
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