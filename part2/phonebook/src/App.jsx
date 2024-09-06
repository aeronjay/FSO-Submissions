import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [search, setSearch] = useState('')
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
      <div>
        filter contact: 
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <h2>add a new contact</h2>
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
        (search === '') ? 
        persons.map((person) => {
          return <p key={person.name}>{person.name} {person.number}</p>;
        })
        : 
        persons.filter((person) => {
          if(person.name.toLocaleLowerCase().includes(search.toLowerCase())){
            return true;
          }
        }).map((person) => {
          return <p key={person.name}>{person.name} {person.number}</p>;
        })

      }
    </div>
  )
}

export default App