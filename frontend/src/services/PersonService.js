import axios from "axios";

const baseUrl = '/api/persons'

const addNumber = (newContact) => {
    // console.log(newContact)
    return axios.post(baseUrl, newContact)
    .then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
            .then(response => {
                return response.data
            })
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson)
            .then(response => response.data)
}

const getAll = () =>{
    return axios.get(`${baseUrl}`).then(response => response.data);
}
``
export default {
    addNumber,
    getAll,
    deletePerson,
    updatePerson,
}