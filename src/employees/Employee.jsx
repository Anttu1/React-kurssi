import '../App.css'
import React, {useState} from 'react'
import EmployeeService from '../services/Employee'

//props on nimeltään customer
const Employee = ({employee, editEmployee, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

  //Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteEmployee = (employee) => {
 let vastaus = window.confirm(`Poistetaan työntekijä ${employee.firstName} ${employee.lastName}`)

 if (vastaus === true) {
 EmployeeService.remove(employee.employeeId)
 .then( res => {
    if (res.status === 200) {
      setMessage(`Poistettu työntekijä ${employee.firstName} ${employee.lastName} onnistuneesti.`)
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
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
    window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

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
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

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
       {employee.firstName} {employee.lastName}
        </h4>

       {showDetails && <div>
                <table>
                    <thead>
                        <tr>
                            <th>Ammattinimike</th>
                            <th>Palkkauspäivä</th>
                            <th>Osoite</th>
                            <th>Postinumero</th>
                            <th>Kaupunki</th>
                            <th>Valtio</th>
                            <th>Puhelinnumero</th>                          
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{employee.title}</td>
                            <td>{employee.hireDate}</td>
                            <td>{employee.address}</td>
                            <td>{employee.postalCode}</td>
                            <td>{employee.city}</td>
                            <td>{employee.country}</td>
                            <td>{employee.homePhone}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => editEmployee(employee)}>Muokkaa</button> 
                <button onClick={() => deleteEmployee(employee)}>Poista</button></div>}
    </div>
  )
}
export default Employee