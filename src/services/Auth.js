import axios from 'axios'

const baseUrl = "https://localhost:7219/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}
export default { authenticate }