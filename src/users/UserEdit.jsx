import '../App.css'
import React, { useState } from 'react'
import UserService from '../services/User'

const UserEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser }) => {

  // Komponentin tilan määritys
  // Kommentoitu username ja password, niitä ei ole mahdollista muokata.
  const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName)
  const [newLastName, setNewLastName] = useState(muokattavaUser.lastName)
  const [newEmail, setNewEmail] = useState(muokattavaUser.email)
  
    // const [newUserName, setNewUserName] = useState(muokattavaUser.userName)
    // const [newPassWord, setNewPassWord] = useState(muokattavaUser.passWord)
   const [newAccessId, setNewAccessId] = useState(muokattavaUser.accessId)

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault()
    var newUser = {
      firstname: newFirstName,
      lastname: newLastName,
      email: newEmail,
      accessId: parseInt(newAccessId),
      //  username: newUserName,
      //  password: md5(newPassWord) // Salataan md5 kirjaston metodilla
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
       <h2>Muokkaa käyttäjää</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstName} placeholder="First name"
                    onChange={({ target }) => setNewFirstName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastName} placeholder="Last name"
                    onChange={({ target }) => setNewLastName(target.value)} required />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="number" value={newAccessId} placeholder="Access level"
                    onChange={({ target }) => setNewAccessId(target.value)} />
            </div>
              {/* <div>
                <input type="text" value={newUserName} placeholder="Username"
                    onChange={({ target }) => setNewUserName(target.value)} />
            </div> 
             <div>
                <input type="password" value={newPassWord} placeholder="Password"
                    onChange={({ target }) => setNewPassWord(target.value)} />
            </div>   */}
            
            <button type='submit' value='save'>Tallenna</button>
            <button value='back' onClick={() => setMuokkaustila(false)}>Takaisin</button>
       </form>

    </div>
  )
}
export default UserEdit