context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/tab-page/dynamic-path-child-page/1fdfd/should-never-see');
  });

  describe('Guard redirect', () => {
    it('Guard must redirect from not allowed page', () => {
      cy.location('pathname').should('eq', '/login');
    });
  });
});
