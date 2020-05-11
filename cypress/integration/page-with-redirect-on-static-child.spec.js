context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/page-with-redirect-on-static-child');
  });

  describe('Page with redirect', () => {
    it('Should redirect on static child', () => {
      cy.wait(100);
      cy.get('#page-with-redirect-on-static-child').should('have.text', 'Target static child page');
    });
  });
});
