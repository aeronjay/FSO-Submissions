import axios from 'axios'

const countryApi = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    const promise = axios.get(`${countryApi}/api/all`)
    return promise.then(response => response.data)
}

export default { getAll }