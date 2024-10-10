import './App.css'
import React, {useState, useEffect} from 'react'
import Customer from './Customer'
import CustomerService from './services/Customer'
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

useEffect(() => {
 CustomerService.getAll()
 .then(data => {
    setCustomers(data)
 })
},[lisäystila, reload, muokkaustila]
)
const editCustomer = (customer) => {
  setMuokattavaCustomer(customer)
  setMuokkaustila(true)
}

  return (
    <>
        <h4><button style={{ cursor: 'pointer' }}
               onClick={() => setShowCustomers(!showCustomers)}>Asiakkaat</button>

                {!lisäystila && <button onClick={() => setLisäystila(true)}>Uusi asiakas</button>}</h4>

                {lisäystila && <CustomerAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}
                {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaCustomer={muokattavaCustomer}
                />}
        {
            showCustomers && customers && customers.map(c => (
                
                <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editCustomer={editCustomer}
                />
                
            )
            )
        }

    </>
  )
}
export default CustomerList