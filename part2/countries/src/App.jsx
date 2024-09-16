import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import Countries from './components/Countries'
import SearchForm from './components/SearchForm'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, []);  

  return (
    <div>
      <SearchForm search={search} setSearch={setSearch} />
      {
        countries ? 
        <Countries countries={countries} search={search}/>
        : 
        "Logging Database"
      }
    </div>
  )
}

export default App
