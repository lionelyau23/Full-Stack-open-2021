import axios from 'axios'

// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newEntry) => {
    return axios.post(baseUrl, newEntry).then(response => response.data)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newEntry) => {
    return axios.put(`${baseUrl}/${id}`, newEntry).then(response => response.data)
}

export default { getAll, create, deleteEntry, update }