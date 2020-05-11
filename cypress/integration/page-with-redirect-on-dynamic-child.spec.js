context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/page-with-redirect-on-dynamic-child/5555');
  });

  describe('Page with redirect on dynamic child', () => {
    it('Should redirect on dymanic child', () => {
      cy.wait(100);
      cy.location('pathname').should('eq', '/page-with-redirect-on-dynamic-child/5555/dynamic-child');
      cy.get('#dynamic-target-child').should('have.text', 'Dynamic target child');
    });
  });
});
