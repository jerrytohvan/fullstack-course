describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDb()
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('form').as('formComponent')
    cy.get('@formComponent').contains('username')
    cy.get('@formComponent').contains('password')
    cy.get('@formComponent').contains('login')
  })
})
