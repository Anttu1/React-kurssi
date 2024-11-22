import React, { useState, useEffect } from 'react'
import UserService from '../services/User'

const UserProfile = ({ setMessage, setIsPositive, setShowMessage }) => {
  const [user, setUser] = useState(null)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassWord, setNewPassWord] = useState('')
  const [oldPassWord, setOldPassWord] = useState('')  // Vanha salasana
  const [passwordError, setPasswordError] = useState('') // Virheilmoitus salasanalle

  useEffect(() => {
    const token = localStorage.getItem('token')
    UserService.setToken(token)
    const userId = localStorage.getItem('id')
    UserService.getUserById(userId)
      .then(data => {
        setUser(data)
        setNewFirstName(data.firstName)
        setNewLastName(data.lastName)
        setNewEmail(data.email)
        setNewPassWord(data.password) // Varmista, että tämä ei näy UI:ssa
      })
      .catch(error => {
        console.error('Error fetching user data', error)
        setMessage('Virhe käyttäjätietojen hakemisessa')
        setIsPositive(false)
        setShowMessage(true)
      })
  }, [setMessage, setIsPositive, setShowMessage])

  const handleEditSubmit = (event) => {
    event.preventDefault()

    // Tarkista vanhan salasanan oikeellisuus
    if (oldPassWord !== user.password) {
      setPasswordError('Vanha salasana on väärin')
      return
    }

    const updatedUser = {
      ...user,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      passWord: newPassWord,  // Päivitä salasana vain, jos se on oikein
    }

    UserService.update(user.userId, updatedUser)
      .then(() => {
        setUser(updatedUser)
        setMessage('Käyttäjän tiedot päivitetty onnistuneesti')
        setIsPositive(true)
        setShowMessage(true)
        setMuokkaustila(false)
        setPasswordError('') // Tyhjennä virheilmoitus

        setTimeout(() => setShowMessage(false), 5000)
      })
      .catch((error) => {
        console.error('Error updating user data', error)
        setMessage('Virhe tietojen päivityksessä')
        setIsPositive(false)
        setShowMessage(true)
      })
  }

  const deleteUser = (user) => {
    let vastaus = window.confirm(`Poistetaan käyttäjä ${user.userName}`)
   
    if (vastaus === true) {
      UserService.remove(user.userId)
        .then(res => {
          if (res.status === 200) {
            setMessage(`Poistettu käyttäjä ${user.userName} onnistuneesti.`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
            setTimeout(() => {
              setShowMessage(false)
            }, 5000)
          }
        })
        .catch(error => {
          setMessage(error)
          setIsPositive(false)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
          setTimeout(() => {
            setShowMessage(false)
          }, 6000)
        })
    } else {
      setMessage('Poisto peruttu onnistuneesti.')
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }
  }

  if (!user) {
    return <div>Ladataan käyttäjän tietoja...</div>
  }

  return (
    <div><br></br>
      <h2>Käyttäjäprofiili</h2><br></br>
      {muokkaustila ? (
        <form onSubmit={handleEditSubmit}>
          Etunimi:
          <div>
            <input
              type="text"
              value={newFirstName}
              onChange={({ target }) => setNewFirstName(target.value)}
            />
          </div>
          Sukunimi:
          <div>
            <input
              type="text"
              value={newLastName}
              onChange={({ target }) => setNewLastName(target.value)}
            />
          </div>
          Sähköposti:
          <div>
            <input
              type="email"
              value={newEmail}
              onChange={({ target }) => setNewEmail(target.value)}
            />
          </div>
          Vanha salasana:
          <div>
            <input
              type="password"
              value={oldPassWord}
              onChange={({ target }) => setOldPassWord(target.value)}
            />
          </div>
          Uusi salasana:
          <div>
            <input
              type="password"
              value={newPassWord}
              onChange={({ target }) => setNewPassWord(target.value)}
            />
          </div>
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          <button type="submit">Tallenna</button>
          <button type="button" onClick={() => setMuokkaustila(false)}>Peruuta</button>
        </form>
      ) : (
        <div>
          <p>Etunimi: {user.firstName}</p>
          <p>Sukunimi: {user.lastName}</p>
          <p>Sähköposti: {user.email}</p>
          <p>Access Level: {user.accessId}</p>
          <button onClick={() => setMuokkaustila(true)}>Muokkaa</button>
          <button onClick={() => deleteUser(user)}>Poista</button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
