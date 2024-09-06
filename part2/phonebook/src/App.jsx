import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "091231231" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
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
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          name: <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>number: <input type='text' value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person) => {
          return <p key={person.name}>{person.name} {person.number}</p>;
        })
      }
    </div>
  )
}

export default App