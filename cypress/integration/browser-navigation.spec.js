context('Browser navigation button', () => {
  describe('Render page content', () => {
    before(() => {
      cy.visit('http://localhost:3000/simple-routing');
    });

    it('Should render nested child content', () => {
      cy.get('#parent-1-title').should('have.text', 'Parent Title 1');
      cy.get('#parent-1-counter').should('have.text', '1');

      cy.get('#parent-1-link').click();
      cy.wait(100);
      cy.get('#parent-1-counter').should('have.text', '2');

      cy.get('#parent-2-title').should('have.text', 'Parent Title 2');

      cy.go('back');
      cy.wait(100);

      cy.get('#parent-2-title').should('not.exist');

      cy.go('forward');
      cy.wait(100);
      cy.get('#parent-2-title').should('have.text', 'Parent Title 2');
    });
  });
});
