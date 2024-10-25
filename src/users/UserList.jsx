import '../App.css'
import React, {useState, useEffect} from 'react'
import UserService from '../services/User'
import UserAdd from './UserAdd'

const UserList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
  UserService.getAll()
  .then(data => {
    setUsers(data)
        })
    },[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const editUsers = (user) => {
  setMuokattavaUser(user)
  setMuokkaustila(true)
}

  return (
        <>
            
            {lisäystila && <UserAdd setLisäystila={setLisäystila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

            <h4>{!lisäystila && <button onClick={() => setLisäystila(true)}>Uusi käyttäjä</button>}</h4>

            {!lisäystila && !muokkaustila &&
            <input placeholder="Etsi sukunimellä" value={search} onChange={handleSearchInputChange} />
            }
            <h2><nobr>Users</nobr></h2>
            {!lisäystila && !muokkaustila &&
            <table id="userTable">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Accesslevel</th>
                    </tr>
                </thead>
                <tbody>

        
                {users && users.map(u =>
                {
                    const lowerCaseName = u.lastname.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                            <tr key={u.userId}>
                                <td>{u.firstname}</td>
                                <td>{u.lastname}</td>
                                <td>{u.email}</td>
                                <td>{u.accessId}</td>
                            </tr>
                            
                                )
                            }
                        }
                    )
                }

                </tbody>

            </table>
            }
         </>
        )
    }

export default UserList