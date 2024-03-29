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

  describe('When logged in', function () {
    beforeEach(function () {
      const user = Cypress.env('MOCK_USER')
      cy.login({ username: user.username, password: user.password })
      cy.createBlog({
        title: 'test blog',
        author: 'test author',
        url: 'test url',
      })

      cy.createBlog({
        title: 'another test blog',
        author: 'another test author',
        url: 'another test url',
      })
    })

    it('A blog can be created', function () {
      cy.contains('John Doe logged in')
      cy.contains('new blog')

      cy.contains('test blog')
      cy.contains('test author')
      cy.should('not.contain', 'test url')

      cy.contains('another test blog')
      cy.contains('another test author')

      cy.contains('test blog').contains('view').click()
      cy.contains('test url')
    })

    it('A blog can be liked', function () {
      cy.contains('test blog').contains('view').click()
      cy.contains('likes 0')
      cy.get('#like-button').click()
      cy.contains('likes 1')
      cy.contains('Like added to blog test blog')
    })

    it('A blog can be removed', function () {
      cy.contains('another test blog').contains('view').click()
      cy.get('#remove-button').click()
      cy.should('not.contain', 'test url')
      cy.contains('Blog another test blog removed!')
    })

    it('A blog can be removed by user who created blog', function () {
      cy.get('#logout-button').click()
      cy.login({ username: 'janedoe', password: 'janedoe' })
      cy.contains('Jane Doe logged in')
      cy.should('not.contain', 'test url')
      cy.contains('another test blog').contains('view').click()

      cy.get('#remove-button').should('not.exist')

      // to test with intercept if the delete button is not disabled
      // cy.intercept({
      //   method: 'DELETE',
      //   url: '*',
      // }).as('deleteApi')

      // cy.get('#remove-button').click()
      // cy.contains('access limited to delete blog')
    })

    it('blogs are sorted by most likes', function () {
      cy.contains('test blog').contains('view').click().as('topBlog')
      cy.get('@topBlog').get('#like-button').click()
      cy.get('div#blog-list').should('have.length', 2)
      cy.get('div#blog-list').eq(0).should('contain', 'test blog')
      cy.get('div#blog-list')
        .eq(1)
        .should('contain', 'another test blog')
    })
  })
})
