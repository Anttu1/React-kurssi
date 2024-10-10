import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer'

//props on nimeltään customer
const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

  //Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteCustomer = (customer) => {
 let vastaus = window.confirm(`Poistetaan asiakas ${customer.companyName}`)

 if (vastaus === true) {
 CustomerService.remove(customer.customerId)
 .then( res => {
    if (res.status === 200) {
      setMessage(`Poistettu asiakas ${customer.companyName} onnistuneesti.`)
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
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
    window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

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
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

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
       {customer.companyName}  
        </h4>

       {showDetails && <div>
                <table>
                    <thead>
                        <tr>
                            <th>Contact person</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                        </tr>
                    </tbody>
                    <button onClick={() => deleteCustomer(customer)}>Poista</button>
                    <button onClick={() => editCustomer(customer)}>Muokkaa</button>
                </table></div>}
    </div>
  )
}
export default Customer