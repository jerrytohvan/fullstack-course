// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem(
      Cypress.env('LOGGED_IN_SESSION'),
      JSON.stringify(body)
    )
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem(Cypress.env('LOGGED_IN_SESSION'))).token
      }`,
    },
  })
  cy.visit('')
})

Cypress.Commands.add('resetDb', () => {
  cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
    username: 'janedoe',
    name: 'Jane Doe',
    password: 'janedoe',
  })
  cy.request(
    'POST',
    `${Cypress.env('BACKEND')}/users`,
    Cypress.env('MOCK_USER')
  ).then(() => {
    cy.visit('')
  })
})
