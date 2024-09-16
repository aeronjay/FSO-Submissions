import {  useEffect, useState  } from 'react'
import axios from 'axios'

const Countries = ({  countries,search  }) => {
    const filtered = search === '' 
    ? [] 
    : countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
    
    if(search === '') {
        return <div>This App is Used to Search For Countries</div>
    }

    if(filtered.length === 1) {
        return <Country country={filtered[0]} key={filtered[0].name.common} showing={true}/>
    }
    
    return(
        <div>
            {
             filtered.length <= 10 ? 
             filtered.map((count) => {
                return <Country country={count} key={count.name.common} showing={false}/>
             })
             :
             <div>Too Many Match, Please Make it More Specific</div>
            }
        </div>
    )
}
const Country = ({  country, showing  }) => {

    const [show, setShow] = useState(showing)
    const [weather, setWeather] = useState(null)
    const OWM_API_KEY = import.meta.env.VITE_OWM_API

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${OWM_API_KEY}`).then(response => {
            setWeather(response.data)
            console.log(response.data)
        })
    }, [])


    if(!show){
        return (
            <p key={country.altSpellings[0]}>{country.name.common}  <button onClick={() => setShow(true)}>show</button></p>
        )
    }else{
        

        return(
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
                {
                    weather ? 
                    <>
                        <h1>Weather In {country.capital[0]}</h1>
                        <p>Temperature: {weather.main.temp} Degrees Celcius</p>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                        <p>Wind: {weather.wind.speed} m/s</p>
                    </>
                    :
                    "Getting Weather"
                }
            </div>
        )
    }
}

export default Countries