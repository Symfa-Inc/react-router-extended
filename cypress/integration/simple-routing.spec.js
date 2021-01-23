context('Simple routing', () => {
  describe('Render page content', () => {
    before(() => {
      cy.visit('http://localhost:3000/simple-routing');
    });

    it('Should render page content', () => {
      cy.get('#parent-1-title').should('have.text', 'Parent Title 1');
      cy.get('#parent-1-counter').should('have.text', '1');
    });
    it('Should render nested child content', () => {
      cy.get('#parent-1-link').click();
      cy.wait(100);
      cy.get('#parent-1-counter').should('have.text', '2');

      cy.get('#parent-2-title').should('have.text', 'Parent Title 2');
    });
    it('Should render 2 nested depth child content', () => {
      cy.get('#parent-2-link').click();
      cy.wait(100);
      cy.get('#parent-1-counter').should('have.text', '3');
      cy.get('#parent-2-counter').should('have.text', '2');

      cy.get('#parent-3-title').should('have.text', 'Parent Title 3');
    });
    it('Should render 3 nested depth child content', () => {
      cy.get('#parent-3-link').click();
      cy.wait(100);
      cy.get('#parent-1-counter').should('have.text', '4');
      cy.get('#parent-2-counter').should('have.text', '3');
      cy.get('#parent-3-counter').should('have.text', '2');

      cy.get('#last-child-title').should('have.text', 'Last Child');
    });
  });

  describe('Render page content with query params', () => {
    before(() => {
      cy.visit('http://localhost:3000/simple-routing?testParam=1');
    });
    it('Should render page content', () => {
      cy.get('#parent-1-title').should('have.text', 'Parent Title 1');
      cy.get('#parent-1-counter').should('have.text', '1');
      cy.location().should((loc) => {

        expect(loc.search).to.eq('?testParam=1');
      });
    });
  });
  describe('Render page content 2 children', () => {
    before(() => {
      cy.visit('http://localhost:3000/simple-routing-two-children');
    });
    it('Should render parent page with 2 children content', () => {
      cy.get('#parent-title').should('have.text', 'Parent title');
      cy.get('#parent-counter').should('have.text', '1');

      cy.get('#parent-link-1').click();
      cy.wait(100);
      cy.get('#parent-counter').should('have.text', '2');
      cy.get('#first-child-title').should('have.text', 'First Child Title');
      cy.get('#first-child-counter').should('have.text', '1');

      cy.get('#parent-link-1').click();
      cy.get('#parent-counter').should('have.text', '3');
      cy.get('#first-child-title').should('have.text', 'First Child Title');
      cy.get('#first-child-counter').should('have.text', '2');

      cy.get('#first-child-link').click();
      cy.wait(100);
      cy.get('#parent-counter').should('have.text', '4');

      cy.get('#parent-link-2').click();
      cy.get('#parent-counter').should('have.text', '5');
      cy.get('#second-child-title').should('have.text', 'Second Child Title');
      cy.get('#second-child-counter').should('have.text', '1');
    });
  });
});
