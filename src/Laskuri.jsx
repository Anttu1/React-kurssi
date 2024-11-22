import './App.css'
import React, {useState} from 'react'

//Propsi otettu vastaan suoraan nimellä
const Laskuri = ({huomio}) => {

  //Komponentin tilan määritys
const [luku, setLuku] = useState(0)

  return (
    <>
    <br></br>
       <h4><button onClick={() => setLuku(luku - 1)}>
        - </button>
        
        <button onClick={() => setLuku(luku + 1)}>
        + </button>
        <h1>{luku}</h1>
        <button onClick={() => setLuku(0)}>
        Reset </button></h4>

    </>
  )
}
export default Laskuri