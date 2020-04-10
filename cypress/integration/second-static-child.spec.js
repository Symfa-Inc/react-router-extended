context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/tab-page/second-static-child');
  });

  describe('Second static child', () => {
    it('Second static child exists on tab page', () => {
      cy.get('#tab-page').should('have.text', 'Tab page');
      cy.get('#second-static-child').should('have.text', 'Second Static-child');
    });
  });
});
