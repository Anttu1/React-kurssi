import '../App.css'
import React, {useState, useEffect} from 'react'
import UserService from '../services/User'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [users, setUsers] = useState([])
const [showUsers, setShowUsers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
    const token = localStorage.getItem('token')
      UserService
        .setToken(token)
   
  UserService.getAll()
  .then(data => {
    setUsers(data)
        })
    },[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )
 
 const handleSearchInputChange = (event) => {
   setShowUsers(true)
   setSearch(event.target.value.toLowerCase())
 }

const editUser = (user) => {
  setMuokattavaUser(user)
  setMuokkaustila(true)
}

  return (
    <div className='userlist'>
      <br></br>
            <h4><button style={{ cursor: 'pointer' }}
               onClick={() => setShowUsers(!showUsers)}>Käyttäjät</button>

                {!lisäystila && <button onClick={() => setLisäystila(true)}>Uusi Käyttäjä</button>}</h4>

            {!lisäystila && !muokkaustila &&
                <input placeholder="Etsi nimellä" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <UserAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}
                {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaUser={muokattavaUser}
                />}
        {
            !lisäystila && !muokkaustila && showUsers && users && users.map(u => {
              const lowerCaseSearch = search.toLowerCase(); // Hakusana pieniksi kirjaimiksi
              const lowerCaseFirstName = u.firstName.toLowerCase();
              const lowerCaseLastName = u.lastName.toLowerCase();
              if (lowerCaseFirstName.indexOf(lowerCaseSearch) > -1 || lowerCaseLastName.indexOf(lowerCaseSearch) > -1) {
                  return(
                <User key={u.UserId} user={u} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editUser={editUser}
                />
              
            )
          }}
            )
        }

    </div>
  )
}

export default UserList