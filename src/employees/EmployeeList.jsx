import '../App.css'
import React, {useState, useEffect} from 'react'
import EmployeeService from '../services/Employee'
import Employee from './Employee'
import EmployeeAdd from './EmployeeAdd'
import EmployeeEdit from './EmployeeEdit'

const EmployeeList = ({setIsPositive, setShowMessage, setMessage}) => {

  //Komponentin tilan määritys
const [employees, setEmployees] = useState([])
const [showEmployees, setShowEmployees] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaEmployee, setMuokattavaEmployee] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {

const token = localStorage.getItem('token')
      EmployeeService
        .setToken(token)
        
 EmployeeService.getAll()
 .then(data => {
    setEmployees(data)
 })
},[lisäystila, reload, muokkaustila]
)
const handleSearchInputChange = (event) => {
  setShowEmployees(true)
  setSearch(event.target.value.toLowerCase())
}
const editEmployee = (employee) => {
  setMuokattavaEmployee(employee)
  setMuokkaustila(true)
}

  return (
    <div className='emplist'>
      <br></br>
        <h4><button style={{ cursor: 'pointer' }}
               onClick={() => setShowEmployees(!showEmployees)}>Työntekijät</button>

                {!lisäystila && <button onClick={() => setLisäystila(true)}>Uusi työntekijä</button>}</h4>

                {!lisäystila && !muokkaustila &&
                <input placeholder="Etsi työntekijän nimellä" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <EmployeeAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}
                {muokkaustila && <EmployeeEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaEmployee={muokattavaEmployee}
                />}
        {
            !lisäystila && !muokkaustila && showEmployees && employees && employees.map(e => {
                const lowerCaseSearch = search.toLowerCase(); // Hakusana pieniksi kirjaimiksi
                const lowerCaseFirstName = e.firstName.toLowerCase();
                const lowerCaseLastName = e.lastName.toLowerCase();
                if (lowerCaseFirstName.indexOf(lowerCaseSearch) > -1 || lowerCaseLastName.indexOf(lowerCaseSearch) > -1) {
                return(
                <Employee key={e.employeeId} employee={e} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editEmployee={editEmployee}
                />
              
            )
          }}
            )
        }

    </div>
  )
}
export default EmployeeList