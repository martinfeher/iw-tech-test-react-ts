
describe('display select and table elements', () => {
    beforeEach(() => {
        cy.visit("localhost:3000");
    })
    it('display select local authority and display establishments table elements', () => {
        cy.get('#selectAuthority').should('exist');
        cy.get('.tableEstablishments').should('exist');
    })
})
