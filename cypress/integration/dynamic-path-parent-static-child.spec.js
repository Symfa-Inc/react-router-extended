context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/tab-page/dynamic-path-child-page/4444/static-child');
  });

  describe('Dynamic parent static child', () => {
    it('Static child exists on dynamic parent and tab page', () => {
      cy.get('#tab-page').should('have.text', 'Tab page');
      cy.get('#dynamic-path-child-page').should('have.text', 'Dynamic-path-child-page');
      cy.get('#dynamic-parent-static-child').should('have.text', 'Dynamic-parent-static-child');
    });
  });
});
