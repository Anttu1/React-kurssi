import './App.css'
import React, {useState} from 'react'

const Laskuri = (props) => {

  //Komponentin tilan määritys
const [luku, setLuku] = useState(0)

  return (
    <>
        <h2>{luku}</h2>
        
       <h3><button onClick={() => setLuku(luku - 1)}>
        - </button>
        
        <button onClick={() => setLuku(luku + 1)}>
        + </button></h3>

        <button onClick={props.huomio}>Huomio</button>
    </>
  )
}
export default Laskuri