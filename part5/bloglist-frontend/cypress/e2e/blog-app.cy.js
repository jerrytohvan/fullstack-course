describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDb()
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('form').as('formComponent')
    cy.get('@formComponent').contains('username')
    cy.get('@formComponent').contains('password')
    cy.get('@formComponent').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input#username').type('johndoe')
      cy.get('input#password').type('johndoe')
      cy.get('#login-submit').click()

      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input#username').type('johndoe')
      cy.get('input#password').type('wrongpass')
      cy.get('#login-submit').click()

      cy.get('.error')
        .contains('invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'John Doe logged in')
    })
  })
})
