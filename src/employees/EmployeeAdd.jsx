import '../App.css'
import React, {useState} from 'react'
import EmployeeService from '../services/Employee'

const EmployeeAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    // Komponentin tilan määritys
    
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newTitleofCourtesy, setNewTitleOfCourtesy] = useState('')
    
    const [newBirthDate, setNewBirthDate] = useState('')
    const [newHireDate, setNewHireDate] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newPostalCode, setNewPostalCode] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newRegion, setNewRegion] = useState('')
    const [newCountry, setNewCountry] = useState('')
    const [newHomePhone, setNewHomePhone] = useState('')
    const [newExtension, setNewExtension] = useState('') 
    const [newNotes, setNewNotes] = useState('') 
    
    
    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
          event.preventDefault()
          var newEmployee = {
            firstName: newFirstName,
            lastName: newLastName,
            title: newTitle,
            titleOfCourtesy: newTitleofCourtesy,
            birthDate: newBirthDate,
            hireDate: newHireDate,
            address: newAddress,
            postalCode: newPostalCode,
            city: newCity,
            region: newRegion,
            country: newCountry,
            homePhone: newHomePhone,
            extension: newExtension,
            notes: newNotes,
        }
        
        EmployeeService.create(newEmployee)
        .then(response => {
          if (response.status === 200) {
            setMessage(`Lisätty uusi työntekijä: ${newEmployee.firstName} ${newEmployee.lastName}`)
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
            <h2>Lisää Työntekijä</h2>
            <form onSubmit={handleSubmit}>
       <div>
                <input type="text" value={newFirstName} placeholder="Etunimi"
                    onChange={({ target }) => setNewFirstName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastName} placeholder="Sukunimi"
                    onChange={({ target }) => setNewLastName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newTitleofCourtesy} placeholder="Puhutteluarvo"
                    onChange={({ target }) => setNewTitleOfCourtesy(target.value)} />
            </div>
            Syntymäaika:
            <div>
                <input type="date" value={newBirthDate} name="Syntymäaika"
                    onChange={({ target }) => setNewBirthDate(target.value)} />
            </div>
            Palkkauspäivä:
            <div>
                <input type="date" value={newHireDate} name="Palkkauspäivä"
                    onChange={({ target }) => setNewHireDate(target.value)} />
            </div>
            <div>
                <input type="text" value={newTitle} placeholder="Ammattinimike"
                    onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                <input type="text" value={newAddress} placeholder="Osoite"
                    onChange={({ target }) => setNewAddress(target.value)} />
            </div>
            <div>
                <input type="text" value={newPostalCode} placeholder="Postinumero"
                    onChange={({ target }) => setNewPostalCode(target.value)} />
            </div>
            <div>
                <input type="text" value={newCity} placeholder="Kaupunki"
                    onChange={({ target }) => setNewCity(target.value)} />
            </div>
            <div>
                <input type="text" value={newRegion} placeholder="Alue"
                    onChange={({ target }) => setNewRegion(target.value)} />
            </div>
            <div>
                <input type="text" value={newCountry} placeholder="Valtio"
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            <div>
                <input type="text" value={newHomePhone} placeholder="Puhelinnumero"
                    onChange={({ target }) => setNewHomePhone(target.value)} />
            </div>
            <div>
                <input type="text" value={newExtension} placeholder="Laajennus"
                    onChange={({ target }) => setNewExtension(target.value)} />
            </div>
            <div>
                <input type="text" value={newNotes} placeholder="Muistiinpanot"
                    onChange={({ target }) => setNewNotes(target.value)} />
            </div>
         
         <button type='submit' value='save'>Tallenna</button>
         <button value='back' onClick={() => setLisäystila(false)}>Takaisin</button>
       </form>
    </div>
  )
}
export default EmployeeAdd