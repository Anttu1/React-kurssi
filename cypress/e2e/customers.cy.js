describe('Asiakkaat sivu', function () {

  const md5 = require('md5');  // Tuodaan MD5-kirjasto

  // Salasanan hashauksen määrittäminen ennen jokaista testiä
  const hashedPassword = md5('Testaaja');  // Salasanan hash

  beforeEach(function () {
   // Käytetään API-pyyntöä suoraan kirjautumiseen
   cy.request({
    method: 'POST',
    url: 'https://localhost:7219/api/authentication',  // API-pyyntö URL
    body: {
      username: 'Teppo',
      password: hashedPassword  // Lähetetään hashattu salasana
    },
    failOnStatusCode: false  // Älä keskeytä testejä, vaikka status olisi virheellinen
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
    // Siirry asiakassivulle
    cy.visit('http://localhost:5173/customers')

   
  })

  it('Sivu avautuu ja näyttää asiakasdataa', function () {
    cy.contains('Asiakkaat')  // Tarkistaa, että asiakassivun otsikko löytyy
    cy.get('button').contains('Asiakkaat').click() // Asiakkaat tulee listattuna
    cy.wait(2000)
  })

  it('Lisäyslomake aukeaa ja lisäys toimii oikein', function () {
    // Avaa lisäyslomake
    cy.get('button').contains('Uusi asiakas').click()
    cy.contains('Tallenna') // Tarkistaa, että lomake sisältää tallennuspainikkeen
    cy.contains('Takaisin')
    
    // Täytä lomake
    cy.get('input[placeholder="ID (5 isoa kirjainta)"]').type('TESTI')
    cy.get('input[placeholder="Yrityksen nimi"]').type('Testiyritys') 
    cy.get('input[placeholder="Yhteyshenkilö"]').type('Matti Meikäläinen')
    cy.get('input[placeholder="Yhteyshenkilön titteli"]').type('Omistaja')
    cy.get('input[placeholder="Osoite"]').type('Testitie 3')
    cy.get('input[placeholder="Postinumero"]').type('54321')
    cy.get('input[placeholder="Kaupunki"]').type('Helsinki')
    cy.get('input[placeholder="Valtio"]').type('Suomi')
    cy.get('input[placeholder="Puhelinnumero"]').type('0401234567')
    
    // Lähetä lomake
    cy.get('button').contains('Tallenna').click()

    // Varmista, että lisäys onnistui
    cy.get('button').contains('Asiakkaat').click() // Asiakkaat tulee listattuna
    cy.contains('Lisätty uusi asiakas: Testiyritys')
    cy.wait(5000)
    cy.contains('Testiyritys') // Tarkistaa, että uusi asiakas näkyy listalla
  })

  it('Asiakkaan muokkaus onnistuu', function () {
    cy.get('button').contains('Asiakkaat').click() // Asiakkaat tulee listattuna
    // Etsi asiakas nimeltä "Testiyritys"
    cy.contains('Testiyritys').click() 
    
    // Muokkaa tietoja
    cy.contains('Muokkaa').click() 
    
    // Täytä muokkauslomake
    cy.get('input[name="companyName"]').clear().type('Uusi Testiyritys') // Esimerkkinä yrityksen nimen muuttaminen
    cy.contains('Tallenna').click() // Klikkaa "Tallenna"-painiketta
    
    // Varmista, että muokkaus onnistui ja uusi nimi näkyy
    cy.contains('Muokattu asiakasta: Uusi Testiyritys') // Tarkistaa, että sisältää messagen
    cy.wait(4000)
    cy.contains('Uusi Testiyritys')
    })

  it('Asiakkaan poistaminen onnistuu', function () {
    cy.get('button').contains('Asiakkaat').click() // Asiakkaat tulee listattuna
    // Etsi asiakas nimeltä "Uusi Testiyritys"
    cy.contains('Uusi Testiyritys').click() 
    
    // Klikkaa "Poista"-painiketta
    cy.contains('Poista').click()
    
    // Varmista, että tulee poistoviesti "Poistetaan asiakas Testiyritys"
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Poistetaan asiakas Uusi Testiyritys')
    })
    
    // Klikkaa "Ok" poistovahvistuksessa
    cy.on('window:confirm', () => true)

    // Varmista, että poisto onnistui
    cy.contains('Poistettu asiakas Uusi Testiyritys onnistuneesti') // Tarkistaa, että poisto on vahvistettu

    // Varmista, että asiakas ei enää näy listalla
    cy.wait(5000)
    cy.get('h4').should('not.contain', 'Uusi Testiyritys')
  })
})
