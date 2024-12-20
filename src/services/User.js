import axios from 'axios'

const baseUrl = "https://nwanttu-fvbyb0avfdbyfuc4.canadacentral-01.azurewebsites.net/api/users"

let token = null
//Tätä metodia kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
//Parametrina annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}
// Hakee yksittäisen käyttäjän ID:n perusteella
const getUserById = (UserId) => {
    const config = {
      headers: { Authorization: token },
    }
    const request = axios.get(`${baseUrl}/${UserId}`, config)
    return request.then(response => response.data)
  }

const getAll = () => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.get(baseUrl,config)
    return request.then(response => response.data)
}

const create = newUser => {
    const config = {
        headers: {Authorization: token},
    }
    return axios.post(baseUrl, newUser, config)
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
    return axios.put(`${baseUrl}/${object.userId}`, object, config)
}
// Päivittää käyttäjän salasanan yksittäisen käyttäjän ID:n perusteella
const updateUser = (userId, updatedPassWord) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${userId}`, updatedPassWord, config);
};

// Poistaa käyttäjän
const deleteUser = (userId) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${userId}`, config);
};

export default { getUserById, getAll, create, remove, update, setToken, updateUser, deleteUser }