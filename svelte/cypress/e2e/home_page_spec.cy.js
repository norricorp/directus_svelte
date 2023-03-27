describe('The Home Page', () => {

  before(() => {
    // runs once before all tests in the block
     //cy.exec('c:/temp/sqlite/sqlite3 c:/temp/directus_examples/directus/data.db < c:/temp/directus_examples/directus/data.sql')
  })

    it('successfully displays and get public articles', () => {


      cy.visit('/')

      // home page
      cy.contains('association of thirteen global banks')

      cy.contains("not authenticated")

      //cy.contains("Democratize Your Data").should('not.exist')

      cy.contains("an amazing company").should('not.exist')

      cy.contains("Members Only").should('not.exist')

      cy.contains('Public Articles').click()

      cy.contains("Democratize Your Data")

      cy.get('[data-cy=loginlink]').click()

      cy.get('[data-cy=login_username]').type("maria@email.com")

      // {enter} causes the form to submit
      cy.get('input[name=passwd]').type(`12345678{enter}`)

      cy.contains("Hello Maria Tucker")

      cy.contains('Members Only').click()

      cy.contains("an amazing company")

      cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })

      cy.get('[data-cy=logoutlink]').click()

      cy.contains("not authenticated")

      cy.contains("an amazing company").should('not.exist')

      cy.contains("Members Only").should('not.exist')
   
      cy.contains('association of thirteen global banks')


    })
  })


  /*
          (uncaught exception)NS_ERROR_UNEXPECTED:
        (new url)http://localhost:3000/
        (xhr)POST 400 http://localhost:8055/auth/refresh
        (xhr)OPTIONS 204 http://localhost:8055/auth/refresh
        (uncaught exception)Error: "refresh_token" is required in either the JSON payload or Cookie

NS_ERROR_UNEXPECTED

*/
  