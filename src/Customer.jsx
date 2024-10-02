import './App.css'
import React, {useState, useEffect} from 'react'

//props on nimeltään customer
const Customer = ({customer}) => {

  //Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='card'>
        
       <h4 onMouseEnter={() => setShowDetails(true)}
       onMouseLeave={() => setShowDetails(false)}
       >
           {customer.companyName}
        </h4>

       {showDetails && <div className="customerDetails">
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
                </table></div>}
    </div>
  )
}
export default Customer