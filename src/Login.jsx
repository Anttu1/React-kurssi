import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser}) => {

// Komponentin tilan määritys
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [showPassword, setShowPassword] = useState(false) // Näytä/piilota salasana


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var userForAuth = {
        username: username,
        password: md5(password) // Salataan md5 kirjaston metodilla
    }
    
    //console.log(userForAuth)

    LoginService.authenticate(userForAuth)
    .then(response => {
      if (response.status === 200) {

        // Talletetaan tietoja selaimen local storageen (f12 application välilehti)
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("accessId", response.data.accessId)
        localStorage.setItem("token", response.data.token)

        // Asetetaan app komponentissa olevaan stateen
        setLoggedInUser(response.data.username)

       setMessage(`Kirjauduttu käyttäjällä: ${userForAuth.username}`)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

    }

      })
      .catch((error) => {
        if (error.response) {
          // Palvelin vastasi koodilla, joka ei ole 2xx
          if (error.response.status === 401) {
            setMessage('Väärä käyttäjätunnus tai salasana');
          } else {
            setMessage(`Palvelin vastasi virheellä: ${error.response.status}`);
          }
        } else if (error.request) {
          // Pyyntö tehtiin, mutta vastausta ei saatu
          setMessage('Palvelimeen ei saada yhteyttä. Yritä myöhemmin uudelleen.');
        } else {
          // Jokin muu virhe
          setMessage('Jokin meni pieleen. Yritä myöhemmin uudelleen.');
        }
        setIsPositive(false);
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }
    //Kenttien tyhjennys
    const emptyFields = () => {
        setUsername("")
        setPassword("")
    }

  return (
    <div id="loginWindow">
      <br></br>
       <h2>LOGIN</h2>

       <form onSubmit={handleSubmit}>
            <div className='form-field-container'>
                <input type="text" value={username} placeholder="Käyttäjätunnus"
                    onChange={({ target }) => setUsername(target.value)} required/>
            </div>
            <div className='form-field-container'>
            <input type={showPassword ? 'text' : 'password'} value={password} placeholder="Salasana"
                    onChange={({ target }) => setPassword(target.value)} required />
            <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
             {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            </div>
            
            <button type='submit' value='Login'>Kirjaudu</button>
            <button type='button' value='Empty' onClick={() => emptyFields()}>Tyhjennä</button>
       </form>

    </div>
  )
}

export default Login