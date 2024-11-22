import '../App.css'
import React, { useState } from 'react'
import ProductService from '../services/Product'

const ProductEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct }) => {

  // Komponentin tilan määritys
  const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
  const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
  const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
  
  const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
  const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
  const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
  
  const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)
  const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imageLink)
  

  // onSubmit tapahtumankäsittelijä funktio
  const handleSubmit = (event) => {
    event.preventDefault()
    var newProduct = {
      productId: muokattavaProduct.productId,
      productName: newProductName,
      quantityPerUnit: newQuantityPerUnit,
      unitPrice: parseFloat(newUnitPrice),
      unitsInStock: parseInt(newUnitsInStock),
      unitsOnOrder: parseInt(newUnitsOnOrder),
      reorderLevel: parseInt(newReorderLevel),
      discontinued: newDiscontinued === 'true',
      imageLink: newImageLink,
    }

    ProductService.update(newProduct)
      .then(response => {
        if (response.status === 200) {
          setMessage("Muokattu tuotetta: " + newProduct.productName)
          setIsPositive(true)
          setShowMessage(true)

          setTimeout(() => {
            setShowMessage(false)
          }, 5000)

          setMuokkaustila(false)
        }
      })
      .catch(error => {
        setMessage(error.message || error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
        }, 6000)
      })
  }

  return (
    <div id="edit">
      <h2>Muokkaa tuotetta</h2>

      <form onSubmit={handleSubmit}>
        Tuotteen nimi (pakollinen):
        <div>
          <input
            type="text"
            value={newProductName}
            placeholder="Tuotteen nimi"
            onChange={({ target }) => setNewProductName(target.value)}
            required
          />
        </div>
        Pakkauskoko:
        <div>
          <input
            type="text"
            value={newQuantityPerUnit}
            placeholder="Pakkauskoko"
            onChange={({ target }) => setNewQuantityPerUnit(target.value)}
          />
        </div>
        Hinta:
        <div>
          <input
            type="text"
            value={newUnitPrice}
            placeholder="Hinta"
            onChange={({ target }) => setNewUnitPrice(target.value)}
          />
        </div>
        Varastosaldo:
        <div>
          <input
            type="text"
            value={newUnitsInStock}
            placeholder="Varastosaldo"
            onChange={({ target }) => setNewUnitsInStock(target.value)}
          />
        </div>
        Tilauksessa oleva määrä:
        <div>
          <input
            type="text"
            value={newUnitsOnOrder}
            placeholder="Tilauksessa oleva määrä"
            onChange={({ target }) => setNewUnitsOnOrder(target.value)}
          />
        </div>
        Uudelleentilausraja:
        <div>
          <input
            type="text"
            value={newReorderLevel}
            placeholder="Uudelleentilausraja"
            onChange={({ target }) => setNewReorderLevel(target.value)}
          />
        </div>
        Saatavuus:
        <div>
  <select 
    value={newDiscontinued ? 'Kyllä' : 'Ei'}
    onChange={({ target }) => setNewDiscontinued(target.value === 'Kyllä')}
  >
    <option value="Ei">Ei</option>
    <option value="Kyllä">Kyllä</option>
  </select>
</div>

        Kuvalinkki:
        <div>
          <input
            type="text"
            value={newImageLink}
            placeholder="KuvaLinkki"
            onChange={({ target }) => setNewImageLink(target.value)}
          />
        </div>

        <button type="submit" value="save">Tallenna</button>
        <button type="button" value="back" onClick={() => setMuokkaustila(false)}>Takaisin</button>
      </form>
    </div>
  )
}

export default ProductEdit