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
const [confirmPassword, setConfirmPassword] = useState('') // Salasanan vahvistuskenttä
const [passwordMatch, setPasswordMatch] = useState(true) // Seuraa onko salasanat samat

// Tarkistetaan salasanan ja vahvistuksen yhteensopivuus
const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
    setPasswordMatch(event.target.value === confirmPassword) // Vertaa salasanan ja vahvistuksen kenttiä
    }

const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    setPasswordMatch(newPassword === event.target.value) // Vertaa salasanan ja vahvistuksen kenttiä
    }

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
       <h2>Lisää käyttäjä</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstname} placeholder="Etunimi"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Sukunimi"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Sähköposti"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="number" value={newAccessId} placeholder="AccessId"
                    onChange={({ target }) => setNewAccessId(target.value)} required />
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="Käyttäjätunnus"
                    onChange={({ target }) => setNewUsername(target.value)} required/>
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Salasana"
                    onChange={handlePasswordChange} required/>
            </div>
            <div>
                <input type="password" value={confirmPassword} placeholder="Vahvista salasana"
                    onChange={handleConfirmPasswordChange} required/>
            </div>
                    {/* Tämä ilmoitus tulee jos salasanat eivät täsmää!! */}
        {!passwordMatch && <div className='passworderror'>Salasanat eivät täsmää!</div>}
            
            <button type='submit' value='save'>Tallenna</button>
            <button value='back' onClick={() => setLisäystila(false)}>Takaisin</button>
       </form>

    </div>
  )
}

export default UserAdd