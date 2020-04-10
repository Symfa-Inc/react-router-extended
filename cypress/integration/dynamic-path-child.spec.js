context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/tab-page/dynamic-path-child-page/4444');
  });

  describe('Dynamic child', () => {
    it('Dynamic child exists on tab page', () => {
      cy.get('#tab-page').should('have.text', 'Tab page');
      cy.get('#dynamic-path-child-page').should('have.text', 'Dynamic-path-child-page');
    });
  });
});
