const Countries = ({  countries,search  }) => {
    const filtered = search === '' ? [] : countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
    
    if(search === '') {
        return(
            <div>This App is Used to Search For Countries</div>
        )
    }
    if(filtered.length === 1){
        return (
            <Country country={filtered[0]} />
        )
    }
    return(
        <div>
            {
             filtered.length <= 10 ? 
             filtered.map((count) => {
                return <p key={count.altSpellings[0]}>{count.name.common}</p>
             })
             :
             <div>Too Many Match, Please Make it More Specific</div>
            }
        </div>
    )
}
const Country = ({  country  }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital[0]}</div>
            <h4>Languages: </h4>
            <ul>
                {
                    Object.values(country.languages).map((value) => {
                        return <li key={value}>{value}</li>
                    })
                }
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default Countries