import React, { useState, useEffect } from 'react'
import UserService from '../services/User'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import md5 from 'md5'

const UserProfile = ({ setMessage, setIsPositive, setShowMessage }) => {
  const [user, setUser] = useState(null)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [oldPassWord, setOldPassWord] = useState('')  // Vanha salasana
  const [changePassWord, setChangePassWord] = useState('') // Uusi salasana
  const [passwordError, setPasswordError] = useState('') // Virheilmoitus salasanalle
  const [showOldPassword, setShowOldPassword] = useState(false) // Näytä/piilota salasana
  const [showChangePassword, setShowChangePassword] = useState(false) 

  useEffect(() => {
    const token = localStorage.getItem('token')
    UserService.setToken(token)
    const userId = localStorage.getItem('id')
    UserService.getUserById(userId)
      .then(data => {
        setUser(data)
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
    var updatedPassWord = {
      password: md5(changePassWord),
    }
    console.log('Vanha salasana syötetty:', oldPassWord);  // Tarkista käyttäjän syöttämä salasana
    console.log('Tallennettu salasana (salattuna):', user.passWord);  // Tallennettu salasana, joka on salattu
    console.log('Vertailu:', md5(oldPassWord), '==', user.passWord);  // Tarkista, mitä vertaillaan
    console.log(updatedPassWord)
    if (oldPassWord !== user.passWord) {
      setPasswordError('Vanha salasana on väärin')
      return
    }

    UserService.updateUser(user.userId, updatedPassWord)
      .then(() => {
        setChangePassWord(updatedPassWord)
        setMessage('Käyttäjän salasana päivitetty onnistuneesti')
        setIsPositive(true)
        setShowMessage(true)
        setMuokkaustila(false)
        setPasswordError('') // Tyhjennä virheilmoitus
        setTimeout(() => setShowMessage(false), 5000)
      })
      .catch((error) => {
        console.error('Error updating user data', error)
        setMessage('Virhe salasanan päivityksessä')
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
          Vanha salasana:
          <div className='form-field-container'>
            <input
              type={showOldPassword ? 'text' : 'password'}
              value={oldPassWord}
              onChange={({ target }) => setOldPassWord(target.value)}
            />
            <span onClick={() => setShowOldPassword(!showOldPassword)} className="password-toggle-icon">
              {showOldPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          Uusi salasana:
          <div className='form-field-container'>
            <input
              type={showChangePassword ? 'text' : 'password'}
              value={changePassWord}
              onChange={({ target }) => setChangePassWord(target.value)}
            />
            <span onClick={() => setShowChangePassword(!showChangePassword)} className="password-toggle-icon">
              {showChangePassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          <button type="submit">Tallenna</button>
          <button type="button" onClick={() => setMuokkaustila(false)}>Peruuta</button>
        </form>
      ) : (
        <div className='card'>
          <p>Käyttäjätunnus: {user.userName}</p>
          <p>Etunimi: {user.firstName}</p>
          <p>Sukunimi: {user.lastName}</p>
          <p>Sähköposti: {user.email}</p>
          <p>Access Level: {user.accessId}</p>
          <br></br>
          <button className="userbtn"onClick={() => setMuokkaustila(true)}>Vaihda salasana</button>
          <button className="userbtn"onClick={() => deleteUser(user)}>Poista käyttäjä</button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
