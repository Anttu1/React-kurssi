import '../App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from '../services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

  //Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {
 CustomerService.getAll()
 .then(data => {
    setCustomers(data)
 })
},[lisäystila, reload, muokkaustila]
)
const handleSearchInputChange = (event) => {
  setShowCustomers(true)
  setSearch(event.target.value.toLowerCase())
}
const editCustomer = (customer) => {
  setMuokattavaCustomer(customer)
  setMuokkaustila(true)
}

  return (
    <div className='custlist'>
        <h4><button style={{ cursor: 'pointer' }}
               onClick={() => setShowCustomers(!showCustomers)}>Asiakkaat</button>

                {!lisäystila && <button onClick={() => setLisäystila(true)}>Uusi asiakas</button>}</h4>

                {!lisäystila && !muokkaustila &&
                <input placeholder="Etsi yrityksen nimellä" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <CustomerAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}
                {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaCustomer={muokattavaCustomer}
                />}
        {
            !lisäystila && !muokkaustila && showCustomers && customers && customers.map(c => {
              const lowerCaseName = c.companyName.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                  return(
                <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editCustomer={editCustomer}
                />
              
            )
          }}
            )
        }

    </div>
  )
}
export default CustomerList