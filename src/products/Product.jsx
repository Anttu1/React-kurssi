import '../App.css'
import React, {useState} from 'react'
import ProductService from '../services/Product'

//props on nimeltään product
const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

  //Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteProduct = (product) => {
 let vastaus = window.confirm(`Poistetaan tuote ${product.productName}`)

 if (vastaus === true) {
 ProductService.remove(product.productId)
 .then( res => {
    if (res.status === 200) {
      setMessage(`Poistettu tuote ${product.productName} onnistuneesti.`)
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
       {product.productName}  
        </h4>

       {showDetails && <div>
                <table>
                    <thead>
                        <tr>
                       <th>Tuotteen nimi</th>
                       <th>Pakkauskoko</th>
                       <th>Hinta</th>
                       <th>Varastosaldo</th>
                       <th>KuvaLinkki</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.productName}</td>
                            <td>{product.quantityPerUnit}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.unitsInStock}</td>
                            <td>{product.imageLink}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => editProduct(product)}>Muokkaa</button> 
                <button onClick={() => deleteProduct(product)}>Poista</button></div>}
    </div>
  )
}
export default Product