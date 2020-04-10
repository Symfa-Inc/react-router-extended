context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/independant-page');
  });

  describe('Independant-page', () => {
    it('Independant-page exists', () => {
      cy.get('#independent-page').should('have.text', 'Independant page');
    });
  });
});
