/* eslint-disable-next-line spaced-comment */
/// <reference types="Cypress" />

context('Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Initial display', () => {
    // cy.get('#root').screenshot('initial-display')
  })
})
