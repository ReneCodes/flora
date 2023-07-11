import Garden from "../../src/Components/Garden/Garden"

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
    cy.contains("GARDEN")
    cy.contains("WATER GUIDE").click()
    cy.contains('🧑‍🌾').click()
    cy.contains('🏡').click()
  })
})