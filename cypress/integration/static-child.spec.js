context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/tab-page/static-child');
  });

  describe('Static child', () => {
    it('Static child exists on tab page', () => {
      cy.get('#tab-page').should('have.text', 'Tab page');
      cy.get('#static-child').should('have.text', 'Static-child');
    });

    it('Resolver works on static child page', () => {
      cy.get('#name').should('have.text', 'Joy');
      cy.get('#last-name').should('have.text', 'Doy');

      cy.get('#ui-data').should('have.text', 'blue');
    });
  });
});
