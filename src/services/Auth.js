import axios from 'axios'

const baseUrl = "https://nwanttu-fvbyb0avfdbyfuc4.canadacentral-01.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}
export default { authenticate }