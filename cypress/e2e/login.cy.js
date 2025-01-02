describe('Login sivu ja asiakkaiden sivu', function () {

  beforeEach(function () {
    // Vieraillaan login-sivulla ennen jokaista testiä
    cy.visit('http://localhost:5173')
  })

  it('Sivu avautuu ja näyttää login-lomakkeen', function () {
    cy.contains('LOGIN') // Varmistaa, että otsikko näkyy
    cy.get('input[placeholder="Käyttäjätunnus"]').should('exist')
    cy.get('input[placeholder="Salasana"]').should('exist')
    cy.contains('Kirjaudu').should('exist')
  })

  it('Virheellinen kirjautuminen näyttää virheilmoituksen', function () {
    // Syötetään väärät tunnukset
    cy.get('input[placeholder="Käyttäjätunnus"]').type('vääräkäyttäjä')
    cy.get('input[placeholder="Salasana"]').type('vääräsalasana')
    cy.get('button').contains('Kirjaudu').click()

    // Tarkista virheilmoitus
    cy.contains('Väärä käyttäjätunnus tai salasana').should('exist')
  })

  it('Tyhjennä-painike tyhjentää syötekentät', function () {
    // Täytetään kentät
    cy.get('input[placeholder="Käyttäjätunnus"]').type('testikäyttäjä')
    cy.get('input[placeholder="Salasana"]').type('salasana123')

    // Klikataan Tyhjennä-painiketta
    cy.get('button').contains('Tyhjennä').click()

    // Tarkistetaan, että kentät ovat tyhjät
    cy.get('input[placeholder="Käyttäjätunnus"]').should('have.value', '')
    cy.get('input[placeholder="Salasana"]').should('have.value', '')
  })

  it('Kirjautuminen onnistuu oikeilla tunnuksilla, navbar linkit lisääntyy kun accesslvl 1', function () {
    // 1. Syötetään käyttäjätunnus ja salasana
    cy.get('input[placeholder="Käyttäjätunnus"]').type('Teppo')
    cy.get('input[placeholder="Salasana"]').type('Testaaja')
  
    // 2. Klikataan Kirjaudu-painiketta
    cy.contains('Kirjaudu').click()
  
    // 3. Varmistetaan, että ilmoitus kirjautumisesta näkyy ja navbariin tulee oikeat linkit (accesslvl 1)
    cy.contains('Kirjauduttu käyttäjällä: Teppo')
    cy.contains('Asiakkaat')
    cy.contains('Tuotteet')
    cy.contains('Työntekijät')
    cy.contains('Käyttäjät')
    cy.contains('Postaukset')
    cy.contains('Laskuri')
    cy.contains('Logout')
  })
})
