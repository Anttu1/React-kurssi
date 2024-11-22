import './App.css'
import React, {useState, useEffect} from 'react'
import Laskuri from './Laskuri'
import Posts from './Posts'
import Login from './Login'
import UserProfile from './users/UserProfile'
import CustomerList from './customers/CustomerList'
import ProductList from './products/ProductList'
import EmployeeList from './employees/EmployeeList'
import UserList from './users/UserList'
import Message from './Message'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = () => {
    
// App componentin statet
// Statet messagen näyttämistä varten
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(true)
const [showMessage, setShowMessage] = useState('')
const [loggedInUser, setLoggedInUser] = useState('')

const accessId = parseInt(localStorage.getItem('accessId'), 10) || 0 // Hakee accessId:n

// Logout napin tapahtumankäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}

useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
},[])


    return (
      <div className="App">
        <Router>  

            <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                  <Nav.Link href='/customers'>Asiakkaat</Nav.Link>
                  <Nav.Link href='/products'>Tuotteet</Nav.Link>
                  {/* Users ja Employees tulee näkyviin vain jos käyttäjä on kirjautunut tunnuksella jonka accessId on 1 */}               
                  {accessId === 1 &&<Nav.Link href='/employees'>Työntekijät</Nav.Link>}
                  {accessId === 1 &&<Nav.Link href='/users'>Käyttäjät</Nav.Link>}
                  <Nav.Link href='/posts'>Postaukset</Nav.Link>
                  <Nav.Link href='/laskuri'>Laskuri</Nav.Link>
              </Nav>
                  {loggedInUser && (
                  <Nav className="navbar-logout">
                  <Nav.Link href="/user-profile">Kirjautuneena : {loggedInUser}</Nav.Link>
                  <button className="btn btn-outline-light" onClick={() => logout()}>
                  Logout</button>
              </Nav>)}
            </Navbar>
            
            {showMessage && <Message message={message} isPositive={isPositive} />}
            {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
                  setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}
  
            {loggedInUser && <Routes>
                  <Route path="/customers"
                  element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
                  setShowMessage={setShowMessage} />}>
                  </Route>

            <Route path="/products"
                  element={<ProductList setMessage={setMessage} setIsPositive={setIsPositive} 
                  setShowMessage={setShowMessage} />}> 
            </Route> 
            <Route path="/employees"
                  element={<EmployeeList setMessage={setMessage} setIsPositive={setIsPositive} 
                  setShowMessage={setShowMessage} />}> 
            </Route> 

             <Route path="/users"
                  element={<UserList setMessage={setMessage} setIsPositive={setIsPositive} 
                  setShowMessage={setShowMessage} />}> 
            </Route>
            <Route path="/user-profile"
                  element={<UserProfile setMessage={setMessage} setIsPositive={setIsPositive} 
                  setShowMessage={setShowMessage}/>}/>

            <Route path="/posts"
            element={<Posts info="Nämä ovat yhtiön sosiaalisen median parhaita poimintoja."
            tervehdys="Hei!"/>}>
            </Route>

            <Route path="/laskuri"
            element={<Laskuri />}>
            </Route>
  
            </Routes>
}
        </Router>
            
        </div>
    )
  }
export default App