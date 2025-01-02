describe('Työntekijät sivu', function () {

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
    cy.visit('http://localhost:5173/employees')
  })

  it('Sivu avautuu ja näyttää dataa', function () {
    cy.contains('Työntekijät')  // Tarkistaa, että työntekijät-sivun otsikko löytyy
    cy.get('button').contains('Työntekijät').click() // Työntekijät tulee listattuna
    cy.wait(2000)
  })

  it('Lisäyslomake aukeaa ja lisäys toimii oikein', function () {
    // Avaa lisäyslomake
    cy.get('button').contains('Uusi työntekijä').click()
    cy.contains('Tallenna') // Tarkistaa, että lomake sisältää tallennuspainikkeen
    cy.contains('Takaisin')
    
    // Täytä lomake
    cy.get('input[placeholder="Etunimi"]').type('Matti') 
    cy.get('input[placeholder="Sukunimi"]').type('Meikäläinen')
    cy.get('input[placeholder="Puhutteluarvo"]').type('Mr')
    cy.get('input[name="Syntymäaika"]').type('2024-12-18')
    cy.get('input[name="Palkkauspäivä"]').type('2024-12-18')
    cy.get('input[placeholder="Osoite"]').type('Testitie 3')
    cy.get('input[placeholder="Postinumero"]').type('54321')
    cy.get('input[placeholder="Kaupunki"]').type('Helsinki')
    cy.get('input[placeholder="Valtio"]').type('Suomi')
    cy.get('input[placeholder="Puhelinnumero"]').type('0401234567')
    
    // Lähetä lomake
    cy.get('button').contains('Tallenna').click()

    // Varmista, että lisäys onnistui
    cy.get('button').contains('Työntekijät').click() // Työntekijät tulee listattuna
    cy.contains('Lisätty uusi työntekijä: Matti Meikäläinen')
    cy.wait(5000)
    cy.contains('Matti Meikäläinen') // Tarkistaa, että uusi työntekijä näkyy listalla
  })

  it('Työntekijän muokkaus onnistuu', function () {
    cy.get('button').contains('Työntekijät').click() // Työntekijät tulee listattuna
    cy.contains('Matti Meikäläinen').click() // Klikkaa työntekijää nimeltä "Matti Meikäläinen"
    
    // Muokkaa tietoja
    cy.contains('Muokkaa').click() 
    
    // Täytä muokkauslomake
    cy.get('input[name="Etunimi"]').clear().type('Marko') // Esimerkkinä etunimen muuttaminen
    cy.contains('Tallenna').click() 
    
    // Varmista, että muokkaus onnistui ja uusi nimi näkyy
    cy.contains('Muokattu työntekijää: Marko Meikäläinen') // Tarkistaa, että sisältää messagen
    cy.wait(4000)
    cy.contains('Marko Meikäläinen')
    })

  it('Työntekijän poistaminen onnistuu', function () {
    cy.get('button').contains('Työntekijät').click() // Työntekijät tulee listattuna
    // Etsi asiakas nimeltä "Testiyritys"
    cy.contains('Marko Meikäläinen').click() 
    
    // Klikkaa "Poista"-painiketta
    cy.contains('Poista').click()
    
    // Varmista, että tulee poistoviesti
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Poistetaan työntekijä Marko Meikäläinen')
    })
    
    // Klikkaa "Ok" poistovahvistuksessa
    cy.on('window:confirm', () => true)

    // Varmista, että poisto onnistui
    cy.contains('Poistettu työntekijä Marko Meikäläinen onnistuneesti') // Tarkistaa, että poisto on vahvistettu

    // Varmista, että ei enää näy listalla
    cy.wait(5000)
    cy.get('h4').should('not.contain', 'Marko Meikäläinen')
  })
})
