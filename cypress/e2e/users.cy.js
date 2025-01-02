describe('Käyttäjät sivu', function () {

  const md5 = require('md5');  // Tuodaan MD5-kirjasto

  // Salasanan hashauksen määrittäminen ennen jokaista testiä
  const hashedPassword = md5('Testaaja');  // Salasanan hash
  const uusiSalasana = md5('Testi');

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
    cy.visit('http://localhost:5173/users')
  })

  it('Sivu avautuu ja näyttää dataa', function () {
    cy.contains('Käyttäjät')  // Tarkistaa, että käyttäjät-sivun otsikko löytyy
    cy.get('button').contains('Käyttäjät').click() // Käyttäjät tulee listattuna
    cy.wait(2000)
  })

  it('Lisäyslomake aukeaa ja lisäys toimii oikein', function () {
    // Avaa lisäyslomake
    cy.get('button').contains('Uusi Käyttäjä').click()
    cy.contains('Tallenna')
    cy.contains('Takaisin')
    
    // Täytä lomake
    cy.get('input[placeholder="Etunimi"]').type('Matti') 
    cy.get('input[placeholder="Sukunimi"]').type('Meikäläinen')
    cy.get('input[placeholder="Sähköposti"]').type('mattimeikäläinen@testi.fi')
    cy.get('input[placeholder="AccessId"]').type('1')
    cy.get('input[placeholder="Käyttäjätunnus"]').type('Matti')
    cy.get('input[placeholder="Salasana"]').type(uusiSalasana)
    cy.get('input[placeholder="Vahvista salasana"]').type('Test')
    cy.contains('Salasanat eivät täsmää!').should('be.visible') // Odottaa virheilmoituksen näkyvän
    cy.get('input[placeholder="Vahvista salasana"]').clear().type(uusiSalasana) // Korjaa salasanan  
    cy.contains('Salasanat eivät täsmää!').should('not.exist') // Tarkista, että virheilmoitus häviää

    // Lähetä lomake
    cy.get('button').contains('Tallenna').click()

    // Varmista, että lisäys onnistui
    cy.get('button').contains('Käyttäjät').click() // Käyttäjät tulee listattuna
    cy.contains('Lisätty uusi käyttäjä: Matti Meikäläinen')
    cy.wait(5000)
    cy.contains('Matti Meikäläinen') // Tarkistaa, että uusi käyttäjä näkyy listalla
  })

  it('Käyttäjän muokkaus onnistuu', function () {
    cy.get('button').contains('Käyttäjät').click() // Käyttäjät tulee listattuna
    // Etsi käyttäjä nimeltä "Matti Meikäläinen"
    cy.contains('Matti Meikäläinen').click() 
    
    // Muokkaa tietoja
    cy.contains('Muokkaa').click() 
    
    // Täytä muokkauslomake
    cy.get('input[placeholder="AccessId"]').clear().type('2') // Esimerkkinä accesslevel muuttaminen
    cy.contains('Tallenna').click()
    
    // Varmista, että muokkaus onnistui
    cy.contains('Päivitetty käyttäjä: Matti Meikäläinen') // Tarkistaa, että sisältää messagen
    cy.wait(4000)
    cy.contains('Matti Meikäläinen')
    })

  it('Käyttäjän poistaminen onnistuu', function () {
    cy.get('button').contains('Käyttäjät').click() // Käyttäjät tulee listattuna
    // Etsi käyttäjä nimeltä "Matti Meikäläinen"
    cy.contains('Matti Meikäläinen').click() 
    
    // Klikkaa "Poista"-painiketta
    cy.contains('Poista').click()
    
    // Varmista, että tulee poistoviesti
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Poistetaan käyttäjä Matti')
    })
    
    // Klikkaa "Ok" poistovahvistuksessa
    cy.on('window:confirm', () => true)

    // Varmista, että poisto onnistui
    cy.contains('Poistettu käyttäjä Matti onnistuneesti') // Tarkistaa, että poisto on vahvistettu

    // Varmista, että ei enää näy listalla
    cy.wait(5000)
    cy.get('h4').should('not.contain', 'Matti Meikäläinen')
  })
})
