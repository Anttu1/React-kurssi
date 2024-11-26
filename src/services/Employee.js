import axios from "axios"

const baseUrl = "https://nwanttu-fvbyb0avfdbyfuc4.canadacentral-01.azurewebsites.net/api/employees"

let token = null
//Tätä metodia kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
//Parametrina annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}
const create = newEmployee => {
    const config = {
        headers: {Authorization: token},
    }
    return axios.post(baseUrl, newEmployee, config)
}
const remove = id => {
    const config = {
        headers: {Authorization: token},
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}
const update = (object) => {
    const config = {
        headers: {Authorization: token},
    }
    return axios.put(`${baseUrl}/${object.employeeId}`, object, config)
}
export default { getAll, create, remove, update, setToken}