import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const handleAddNewPerson = (e) => {
    e.preventDefault();
    console.log(e.target);

    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          name: <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
          <div>debug: {newName}</div>

        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person) => {
          return <p key={person.name}>{person.name}</p>;
        })
      }
    </div>
  )
}

export default App