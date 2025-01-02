describe('Tuotteet sivu', function () {

  const md5 = require('md5');  // Tuodaan MD5-kirjasto

  // Salasanan hashauksen määrittäminen ennen jokaista testiä
  const hashedPassword = md5('Testaaja');  // Salasanan hash

  beforeEach(function () {
    cy.request({
      method: 'POST',
      url: 'https://localhost:7219/api/authentication',  // API-pyyntö URL
      body: {
        username: 'Teppo',
        password: hashedPassword  // Lähetetään hashattu salasana
      }
    }).then((response) => {
      console.log(response.body);  // Näytetään API:n vastaus
      expect(response.status).to.eq(200);  // Varmistetaan, että status on 200
      expect(response.body.token).to.exist;  // Varmistetaan, että token löytyy vastauksesta
      // Tallennetaan token ja käyttäjätiedot localStorageen
      localStorage.setItem('token', response.body.token);
      localStorage.setItem('username', response.body.username);
      localStorage.setItem('id', response.body.id);
      localStorage.setItem('accessId', response.body.accessId);
    })
    // Siirry työntekijät-sivulle
    cy.visit('http://localhost:5173/products')
  })

  it('Sivu avautuu ja näyttää dataa', function () {
    cy.contains('Tuotteet')  // Tarkistaa, että tuotteet-sivun otsikko löytyy
    cy.get('button').contains('Tuotteet').click() // Tuotteet tulee listattuna
    cy.wait(2000)
  })

  it('Lisäyslomake aukeaa ja lisäys toimii oikein', function () {
    // Avaa lisäyslomake
    cy.get('button').contains('Uusi tuote').click()
    cy.contains('Tallenna') // Tarkistaa, että lomake sisältää tallennuspainikkeen
    cy.contains('Takaisin')
    
    // Täytä lomake
    cy.get('input[placeholder="Tuotteen nimi (pakollinen)"]').type('Testituote') 
    cy.get('input[placeholder="Pakkauskoko"]').type('5x5')
    cy.get('input[placeholder="Hinta"]').type('12.00')
    cy.get('input[placeholder="Varastosaldo"]').type('10')
    cy.get('input[placeholder="Tilauksessa oleva määrä"]').type('0')

    
    // Lähetä lomake
    cy.get('button').contains('Tallenna').click()

    // Varmista, että lisäys onnistui
    cy.get('button').contains('Tuotteet').click() // Tuotteet tulee listattuna
    cy.contains('Lisätty uusi tuote: Testituote')
    cy.wait(5000)
    cy.contains('Testituote') // Tarkistaa, että uusi tuote näkyy listalla
  })

  it('Tuotteen muokkaus onnistuu', function () {
    cy.get('button').contains('Tuotteet').click() // Tuotteet tulee listattuna
    // Etsi asiakas nimeltä "Testiyritys"
    cy.contains('Testituote').click() // Klikkaa tuotetta nimeltä Testituote
    
    // Muokkaa tietoja
    cy.contains('Muokkaa').click() 
    
    // Täytä muokkauslomake
    cy.get('input[placeholder="Tuotteen nimi"]').clear().type('Testituote2') // Esimerkkinä tuotteen nimen muuttaminen
    cy.contains('Tallenna').click()
    
    // Varmista, että muokkaus onnistui ja uusi nimi näkyy
    cy.contains('Muokattu tuotetta: Testituote2') // Tarkistaa, että sisältää messagen
    cy.wait(4000)
    cy.contains('Testituote2')
    })

  it('Tuotteen poistaminen onnistuu', function () {
    cy.get('button').contains('Tuotteet').click() // Tuotteet tulee listattuna
    // Etsi tuote nimeltä "Testituote2"
    cy.contains('Testituote2').click() 
    
    // Klikkaa "Poista"-painiketta
    cy.contains('Poista').click()
    
    // Varmista, että tulee poistoviesti
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Poistetaan tuote nimeltä Testituote2')
    })
    
    // Klikkaa "Ok" poistovahvistuksessa
    cy.on('window:confirm', () => true)

    // Varmista, että poisto onnistui
    cy.contains('Poistettu tuote Testituote2 onnistuneesti') // Tarkistaa, että poisto on vahvistettu

    // Varmista, että ei enää näy listalla
    cy.wait(5000)
    cy.get('h4').should('not.contain', 'Testituote2')
  })
})
