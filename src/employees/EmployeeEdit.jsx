import '../App.css'
import React, {useState} from 'react'
import EmployeeService from '../services/Employee'

const EmployeeEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaEmployee}) => {

    // Komponentin tilan määritys
    
    const [newFirstName, setNewFirstName] = useState(muokattavaEmployee.firstName)
    const [newLastName, setNewLastName] = useState(muokattavaEmployee.lastName)
    const [newTitle, setNewTitle] = useState(muokattavaEmployee.title)
    const [newTitleofCourtesy, setNewTitleOfCourtesy] = useState(muokattavaEmployee.titleOfCourtesy)
    
    const [newAddress, setNewAddress] = useState(muokattavaEmployee.address)
    const [newPostalCode, setNewPostalCode] = useState(muokattavaEmployee.postalCode)
    const [newCity, setNewCity] = useState(muokattavaEmployee.city)
    const [newRegion, setNewRegion] = useState(muokattavaEmployee.region)
    const [newCountry, setNewCountry] = useState(muokattavaEmployee.country)
    const [newHomePhone, setNewHomePhone] = useState(muokattavaEmployee.homePhone)
    const [newExtension, setNewExtension] = useState(muokattavaEmployee.extension) 
    const [newNotes, setNewNotes] = useState(muokattavaEmployee.notes) 


    
    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
          event.preventDefault()
          var newEmployee = {
            employeeId: muokattavaEmployee.employeeId,
            firstName: newFirstName,
            lastName: newLastName,
            title: newTitle,
            titleOfCourtesy: newTitleofCourtesy,
            address: newAddress,
            postalCode: newPostalCode,
            city: newCity,
            region: newRegion,
            country: newCountry,
            homePhone: newHomePhone,
            extension: newExtension,
            notes: newNotes,
        }
        
        EmployeeService.update(newEmployee)
        .then(response => {
          if (response.status === 200) {
           setMessage(`Muokattu työntekijää: ${newEmployee.firstName} ${newEmployee.lastName}`)
           setIsPositive(true)
           setShowMessage(true)
          
           setTimeout(() => {
            setShowMessage(false)
           }, 5000)
    
           setMuokkaustila(false)
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
    <div id="edit">
            <h2>Muokkaa Työntekijää</h2>
            <form onSubmit={handleSubmit}>
                Etunimi:
            <div>
                <input type="text" value={newFirstName}
                    onChange={({ target }) => setNewFirstName(target.value)} required />
            </div>
            Sukunimi:
            <div>
                <input type="text" value={newLastName}
                    onChange={({ target }) => setNewLastName(target.value)} required />
            </div>
            Puhutteluarvo:
            <div>
                <input type="text" value={newTitleofCourtesy}
                    onChange={({ target }) => setNewTitleOfCourtesy(target.value)} />
            </div>
            Ammattinimike:
            <div>
                <input type="text" value={newTitle}
                    onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            Osoite:
            <div>
                <input type="text" value={newAddress}
                    onChange={({ target }) => setNewAddress(target.value)} />
            </div>
            Postinumero:
            <div>
                <input type="text" value={newPostalCode} 
                    onChange={({ target }) => setNewPostalCode(target.value)} />
            </div>
            Kaupunki:
            <div>
                <input type="text" value={newCity} 
                    onChange={({ target }) => setNewCity(target.value)} />
            </div>
            Alue:
            <div>
                <input type="text" value={newRegion}
                    onChange={({ target }) => setNewRegion(target.value)} />
            </div>
            Valtio:
            <div>
                <input type="text" value={newCountry}
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            Puhelinnumero: 
            <div>
                <input type="text" value={newHomePhone}
                    onChange={({ target }) => setNewHomePhone(target.value)} />
            </div>
            Laajennus:
            <div>
                <input type="text" value={newExtension}
                    onChange={({ target }) => setNewExtension(target.value)} />
            </div>
            Muistiinpanot:
            <div>
                <input type="text" value={newNotes}
                    onChange={({ target }) => setNewNotes(target.value)} />
            </div>
         
         <button type='submit' value='save'>Tallenna</button>
         <button value='back' onClick={() => setMuokkaustila(false)}>Takaisin</button>
       </form>
    </div>
  )
}
export default EmployeeEdit