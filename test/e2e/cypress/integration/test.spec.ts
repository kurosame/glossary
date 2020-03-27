/* eslint-disable spaced-comment */
/// <reference types="Cypress" />
/* eslint-enable spaced-comment */

context('Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Initial display', () => {
    // cy.get('#root').screenshot('initial-display')
  })
})
