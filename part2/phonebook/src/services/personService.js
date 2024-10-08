import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then((response) => response.data)
}
const addPerson = (newPerson) => {
    const promise = axios.post(baseUrl, newPerson)
    return promise.then((response) => response.data)
}
const deletePerson = (id) => {
    const promise = axios.delete(`${baseUrl}/${id}`)
    return promise.then(response => response.data)
}
const updatePerson = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

export default { getAll, addPerson, deletePerson, updatePerson }