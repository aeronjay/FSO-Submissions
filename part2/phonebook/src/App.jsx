import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personService from './services/personService.js'
import Notification from './components/Notification.jsx'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationStyle, setStyle] = useState('')

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
          const Notifstyle = {
            borderStyle : 'solid',
            borderColor: 'green',
            borderWidth: '5',
            color: 'green'
          }
          setStyle(Notifstyle)
          setNotification(`Added ${returnedData.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000);
        })
        .catch((err) => console.log(err))

      
    }else{
      if(confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
        const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLocaleLowerCase())
        const changedNumber = {...existingPerson, number: newNumber}

        personService
          .updatePerson(existingPerson.id, changedNumber)
          .then((response) => {
            alert(`Successfully Replaced ${response.name} Number with ${response.number}`)
            setPersons(persons.map((person) => person.id !== response.id ? person  : response))
            setNewName('');
            setNewNumber('');
          })

      }
    }

  }
  const handleDelete = (id, name) => {
    if(confirm(`Delete ${name} ?`)){
      personService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter(person => person.id !== response.id))
        })
        console.log(`deleted person ${name} with id ${id}`)
    }
  }

  const personExists = (personName) => {
    return persons.some((person) => {
      return person.name.toLowerCase() === personName.toLowerCase()
    })
  }
  

  return (
    <div>
      <Notification message={notification} style={notificationStyle}/>
      <Filter search={search} setSearch={setSearch}/>
      
      
      <PersonForm 
        handleAddNewPerson={handleAddNewPerson} 
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber} 
      />

      <Persons persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )
}

export default App