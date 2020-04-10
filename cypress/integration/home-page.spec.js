context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  describe('Main page', () => {
    it('Main page exists', () => {
      cy.get('#main-page').should('have.text', 'Main page');
    });
  });
});
