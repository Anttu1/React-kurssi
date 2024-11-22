import '../App.css'
import React, {useState} from 'react'
import UserService from '../services/User'

//props on nimeltään user
const User = ({user, editUser, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

  //Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteUser = (user) => {
 let vastaus = window.confirm(`Poistetaan käyttäjä ${user.userName}`)

 if (vastaus === true) {
 UserService.remove(user.userId)
 .then( res => {
    if (res.status === 200) {
      setMessage(`Poistettu käyttäjä ${user.userName} onnistuneesti.`)
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
      //Ilmoituksen piilotus
      setTimeout(() => {
      setShowMessage(false)},
      5000
      )
      reloadNow(!reload)
      }
        }
  )
  .catch(error => {
    setMessage(error)
    setIsPositive(false)
    setShowMessage(true)
    window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

    setTimeout(() => {
      setShowMessage(false)
     }, 6000)
  })
  }
//Jos poisto halutaankin perua
else {
  setMessage('Poisto peruttu onnistuneesti.')
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

      // Ilmoituksen piilotus
      setTimeout(() => {
      setShowMessage(false)},
      5000
      )
  }
}


  return (
    <div className='card'>
        
       <h4 onClick={() => setShowDetails(!showDetails)}>     
       {user.firstName} {user.lastName}  
        </h4>

        {showDetails && <div>
            <table>
                <thead>
                    <tr>
                        <th>Käyttäjänimi</th>
                        <th>Sähköposti</th>
                        <th>Accesslevel</th>
                    </tr>
                </thead>
                <tbody>

        
                            <tr>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.accessId}</td>
                            </tr>

                </tbody>
            </table>
                <button onClick={() => editUser(user)}>Muokkaa</button> 
                <button onClick={() => deleteUser(user)}>Poista</button></div>}
    </div>
  )
}
export default User