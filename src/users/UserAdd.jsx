import '../App.css'
import React, {useState} from 'react'
import UserService from '../services/User'
import md5 from 'md5'

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys
// Id arvo määritellään tietokannassa automaattisesti,
// emme anna sitä itse
const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccessId, setNewAccessId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newUser = {
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        accessId: parseInt(newAccessId),
        username: newUsername,
        password: md5(newPassword) // Salataan md5 kirjaston metodilla
    }
    
    console.log(newUser)

    UserService.create(newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage(`Lisätty uusi käyttäjä: ${newUser.firstname} ${newUser.lastname}`)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }


  return (
    <div id="addNew">
       <h2>User add</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstname} placeholder="First name"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Last name"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="number" value={newAccessId} placeholder="Access level"
                    onChange={({ target }) => setNewAccessId(target.value)} />
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            
            <button type='submit' value='save'>Tallenna</button>
            <button value='back' onClick={() => setLisäystila(false)}>Takaisin</button>
       </form>

    </div>
  )
}

export default UserAdd