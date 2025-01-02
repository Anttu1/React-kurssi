import '../App.css'
import React, {useState} from 'react'
import CustomerService from '../services/Customer'

const CustomerAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    // Komponentin tilan määritys
    
    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newContactName, setNewContactName] = useState('')
    const [newContactTitle, setNewContactTitle] = useState('')
    
    const [newCountry, setNewCountry] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')
    
    const [newPostalCode, setNewPostalCode] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')
    
    
    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
          event.preventDefault()
          var newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }
        
        CustomerService.create(newCustomer)
        .then(response => {
          if (response.status === 200) {
           setMessage("Lisätty uusi asiakas: " + newCustomer.companyName)
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
            console.log(error)
            setIsPositive(false)
            setShowMessage(true)
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
          })
        }





  return (
    <div id="addNew">
            <h2>Lisää Asiakas</h2>
            <form onSubmit={handleSubmit}>
       <div>
                <input type="text" value={newCustomerId} placeholder="ID (5 isoa kirjainta)" maxLength="5" minLength="5"
                    onChange={({ target }) => setNewCustomerId(target.value)} required />
            </div>
            <div>
                <input type="text" value={newCompanyName} placeholder="Yrityksen nimi"
                    onChange={({ target }) => setNewCompanyName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newContactName} placeholder="Yhteyshenkilö"
                    onChange={({ target }) => setNewContactName(target.value)} />
            </div>
            <div>
                <input type="text" value={newContactTitle} placeholder="Yhteyshenkilön titteli"
                    onChange={({ target }) => setNewContactTitle(target.value)} />
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
                <input type="text" value={newCountry} placeholder="Valtio"
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            <div>
                <input type="text" value={newPhone} placeholder="Puhelinnumero"
                    onChange={({ target }) => setNewPhone(target.value)} />
            </div>
            <div>
                <input type="text" value={newFax} placeholder="Fax"
                    onChange={({ target }) => setNewFax(target.value)} />
            </div>
         
         <button type='submit' value='save'>Tallenna</button>
         <button value='back' onClick={() => setLisäystila(false)}>Takaisin</button>
       </form>
    </div>
  )
}
export default CustomerAdd