import '../App.css'
import React, {useState, useEffect} from 'react'
import ProductService from '../services/Product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({setIsPositive, setShowMessage, setMessage}) => {

  //Komponentin tilan määritys
const [products, setProducts] = useState([])
const [showProducts, setShowProducts] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {

const token = localStorage.getItem('token')
      ProductService
        .setToken(token)
        
 ProductService.getAll()
 .then(data => {
    setProducts(data)
 })
},[lisäystila, reload, muokkaustila]
)
const handleSearchInputChange = (event) => {
  setShowProducts(true)
  setSearch(event.target.value.toLowerCase())
}
const editProduct = (product) => {
  setMuokattavaProduct(product)
  setMuokkaustila(true)
}

  return (
    <div className='prodlist'>
      <br></br>
        <h4><button style={{ cursor: 'pointer' }}
               onClick={() => setShowProducts(!showProducts)}>Tuotteet</button>

                {!lisäystila && <button onClick={() => setLisäystila(true)}>Uusi Tuote</button>}</h4>

                {!lisäystila && !muokkaustila &&
                <input placeholder="Etsi tuotteen nimellä" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <ProductAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}
                {muokkaustila && <ProductEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaProduct={muokattavaProduct}
                />}
        {
            !lisäystila && !muokkaustila && showProducts && products && products.map(p => {
              const lowerCaseName = p.productName.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                  return(
                <Product key={p.productId} product={p} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editProduct={editProduct}
                />
              
            )
          }}
            )
        }

    </div>
  )
}
export default ProductList