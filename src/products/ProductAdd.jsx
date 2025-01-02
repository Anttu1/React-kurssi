import '../App.css'
import React, {useState} from 'react'
import ProductService from '../services/Product'

const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    // Komponentin tilan määrittäminen
    const [newProductName, setNewProductName] = useState('')
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
    const [newUnitPrice, setNewUnitPrice] = useState('')
    const [newUnitsInStock, setNewUnitsInStock] = useState('')
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
    const [newReorderLevel, setNewReorderLevel] = useState('')
    const [newDiscontinued, setNewDiscontinued] = useState(false)
    const [newImageLink, setNewImageLink] = useState('')
    
    // Lomakkeen lähettämisen käsittelijä
    const handleSubmit = (event) => {
        event.preventDefault()

        // Luodaan uusi tuoteobjekti, jossa kaikki kentät ovat oikeassa muodossa
        const newProduct = {
            productName: newProductName.trim(),
            quantityPerUnit: newQuantityPerUnit.trim(),
            unitPrice: newUnitPrice ? parseFloat(newUnitPrice) : null,
            unitsInStock: newUnitsInStock ? parseInt(newUnitsInStock) : null, 
            unitsOnOrder: newUnitsOnOrder ? parseInt(newUnitsOnOrder) : null, 
            reorderLevel: newReorderLevel ? parseInt(newReorderLevel) : null,
            imageLink: newImageLink.trim() || null,
            discontinued: newDiscontinued === 'true', 
        }

        // Tarkistetaan, että tuoteobjekti on oikeassa muodossa
        console.log(newProduct)

        // Lähetetään tuote palvelimelle ProductService.create-metodilla
        ProductService.create(newProduct)
        .then(response => {
            if (response.status === 200) {
                setMessage("Lisätty uusi tuote: " + newProduct.productName)
                setIsPositive(true)
                setShowMessage(true)

                // Piilotetaan viesti 5 sekunnin kuluttua
                setTimeout(() => {
                    setShowMessage(false)
                }, 5000)

                // Suljetaan lisäyslomake
                setLisäystila(false)
            }
        })
        .catch(error => {
            setMessage(error.message || "Virhe tuotteen lisäämisessä")
            setIsPositive(false)
            setShowMessage(true)

            // Piilotetaan virheviesti 6 sekunnin kuluttua
            setTimeout(() => {
                setShowMessage(false)
            }, 6000)
        })
    }

    return (
        <div id="addNew">
            <h2>Lisää Tuote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        value={newProductName} 
                        placeholder="Tuotteen nimi (pakollinen)"
                        onChange={({ target }) => setNewProductName(target.value)} 
                        required
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={newQuantityPerUnit} 
                        placeholder="Pakkauskoko"
                        onChange={({ target }) => setNewQuantityPerUnit(target.value)} 
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={newUnitPrice} 
                        placeholder="Hinta"
                        onChange={({ target }) => setNewUnitPrice(target.value)} 
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={newUnitsInStock} 
                        placeholder="Varastosaldo"
                        onChange={({ target }) => setNewUnitsInStock(target.value)} 
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={newUnitsOnOrder} 
                        placeholder="Tilauksessa oleva määrä"
                        onChange={({ target }) => setNewUnitsOnOrder(target.value)} 
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={newReorderLevel} 
                        placeholder="Uudelleentilausraja"
                        onChange={({ target }) => setNewReorderLevel(target.value)} 
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={newImageLink} 
                        placeholder="KuvaLinkki"
                        onChange={({ target }) => setNewImageLink(target.value)} 
                    />
                </div>
                <div>
                Saatavilla :
             <select 
                    value={newDiscontinued ? 'Kyllä' : 'Ei'} name="Saatavilla"
                    onChange={({ target }) => setNewDiscontinued(target.value === 'Kyllä')}
            >
                    <option value="Ei">Ei</option>
                    <option value="Kyllä">Kyllä</option>
            </select>
            </div>
                <button type="submit">Tallenna</button>
                <button type="button" onClick={() => setLisäystila(false)}>Takaisin</button>
            </form>
        </div>
    )
}
export default ProductAdd