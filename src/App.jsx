import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'

const App = () => {

  //App komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)

const huomio = () => {
  alert("Huomio!")
}

  return (
      <div className="App">
        <h1>Hello from React!</h1>

        {showLaskuri && <Laskuri huomio={huomio}/>}
        {/* {showLaskuri === true ? <Laskuri/> : null} */}
        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}
        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

        <Viesti teksti="Tervehdys app komponentista."/>
      </div>
  )
}

export default App