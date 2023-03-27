describe('Register User', () => {

  before(() => {
    // runs once before all tests in the block
     //cy.exec('c:/temp/sqlite/sqlite3 c:/temp/directus_examples/directus/data.db < c:/temp/directus_examples/directus/data.sql')
  })

  it('successfully displays and get public articles', () => {


    cy.visit('/')

    // home page
    cy.contains('association of thirteen global banks')

    cy.contains("not authenticated")

    cy.contains("Members Only").should('not.exist')
    
    cy.on ('window:alert', (text) => {
      expect(text).to.contains("Fred Smith is registered");
    })

    cy.get('[data-cy=registerlink]').click()

    cy.get('[data-cy=firstname]').type("Fred")

    cy.get('[data-cy=surname]').type("Smith")

    cy.get('[data-cy=emailaddr]').type("fred@email.com")

    // {enter} causes the form to submit
    cy.get('input[data-cy=passwd]').type(`12345678{enter}`)

    cy.wait(3000) 

    
    cy.request('SEARCH', 'http://localhost:8055/users/', 
        { 
          "query": {
            "filter": {
              "first_name": {
                "_eq": "Fred"
              },
              "last_name": {
                "_eq": "Smith"
              }
           }
          }
        }).then(
      (response) => {
        cy.log("result of search is " + JSON.stringify(response.body));
        cy.log("result of search is " + response.body.data[0].id);
        cy.wrap(response.body.data[0].id).as('fredID')
//        fredID = response.body.data[0].id;
//        cy.log("Inside request, fred id is " + fredID);
      }
    )
    
    cy.get('@fredID').then(fredID => {
      cy.log("fred's ID is " + fredID);
    })
    // now set the new user to Active (do this as admin)

    cy.request('POST', 'http://localhost:8055/auth/login', 
    {
      "email": "admin@example.com",
      "password": "d1r3ctu5"
    }).then(
      (response) => {
        cy.log("result of login is " + JSON.stringify(response.body));
        cy.log("result of token is " + response.body.data.access_token);
        cy.wrap(response.body.data.access_token).as('adminAT')
        cy.wrap(response.body.data.refresh_token).as('adminRT')
      }
    )

    cy.get('@adminRT').then(adminRT => {
      cy.log("admin refesh token is " + adminRT);
    })

    cy.get('@fredID').then(fredID => {
      cy.get('@adminAT').then(adminAT => {
        cy.request({
          method: 'PATCH', 
          url: 'http://localhost:8055/users/' + fredID, 
          auth: {
            'bearer': adminAT
          },
          body: { 
            status: 'active' 
          }
        })
      })
    }) 


  

    cy.get('@adminRT').then(adminRT => {
      cy.request('POST', 'http://localhost:8055/auth/logout',    {
        "refresh_token": adminRT
      })      
    })
    
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
  
    cy.get('[data-cy=loginlink]').click()

    cy.get('[data-cy=login_username]').type("fred@email.com")

    // {enter} causes the form to submit
    cy.get('input[name=passwd]').type(`12345678{enter}`)

    cy.contains("Hello Fred Smith")

    cy.get('[data-cy=logoutlink]').click()

    cy.contains("not authenticated")

    // tidy up be deleting user as admin
    cy.request('POST', 'http://localhost:8055/auth/login', 
    {
      "email": "admin@example.com",
      "password": "d1r3ctu5"
    }).then(
      (response) => {
        cy.log("result of login is " + JSON.stringify(response.body));
        cy.log("result of token is " + response.body.data.access_token);
        cy.wrap(response.body.data.access_token).as('adminAT')
        cy.wrap(response.body.data.refresh_token).as('adminRT')
      }
    )

    cy.get('@fredID').then(fredID => {
      cy.get('@adminAT').then(adminAT => {
        cy.request({
          method: 'DELETE', 
          url: 'http://localhost:8055/users/' + fredID, 
          auth: {
            'bearer': adminAT
          }
        })
      })
    }) 

    cy.get('@adminRT').then(adminRT => {
      cy.request('POST', 'http://localhost:8055/auth/logout',    {
        "refresh_token": adminRT
      })      
    })
    



  }) // end of it
})  // end of describe


