context('Routing with params', () => {
  describe('Render page content', () => {
    before(() => {
      cy.visit('http://localhost:3000/routing-with-params-dynamic-child');
    });
    it('Should render nested dynamic child content', () => {
      cy.get('#parent-1-title').should('have.text', 'Parent Title 1');
      cy.get('#parent-1-counter').should('have.text', '1');
      cy.get('#parent-1-link').click();
      cy.wait(100);
      cy.get('#parent-1-counter').should('have.text', '2');

      cy.get('#child-title').should('have.text', 'Child');
    });
  });

  describe('Render page content', () => {
    before(() => {
      cy.visit('http://localhost:3000/routing-with-params-dynamic-child-dynamic-parent/1234');
    });
    it('Should render nested dynamic child content with dynamic parent', () => {
      cy.get('#parent-1-title').should('have.text', 'Parent Title 1');
      cy.get('#parent-1-counter').should('have.text', '1');
      cy.get('#parent-1-link').click();
      cy.wait(100);
      cy.get('#parent-1-counter').should('have.text', '2');

      cy.get('#child-title').should('have.text', 'Child');
    });
  });

  describe('Render page content', () => {
    before(() => {
      cy.visit('http://localhost:3000/routing-with-params-dynamic-child-static-parent/1234');
    });
    it('Should render nested static child content with dynamic parent', () => {
      cy.get('#parent-1-title').should('have.text', 'Parent Title 1');
      cy.get('#parent-1-counter').should('have.text', '1');
      cy.get('#parent-1-link').click();
      cy.wait(100);
      cy.get('#parent-1-counter').should('have.text', '2');

      cy.get('#child-title').should('have.text', 'Child');
    });
  });

  describe('Render page content', () => {
    before(() => {
      cy.visit('http://localhost:3000/routing-with-params-dynamic-child-dynamic-parent-dynamic-child/1234');
    });
    it('Should render parent dynamic content child dynamic and child dynamic', () => {
      cy.get('#parent-1-title').should('have.text', 'Parent Title 1');
      cy.get('#parent-1-counter').should('have.text', '1');
      cy.get('#parent-1-link').click();
      cy.wait(100);
      cy.get('#parent-1-counter').should('have.text', '2');

      cy.get('#first-child-title').should('have.text', 'First Child');
      cy.get('#first-child-counter').should('have.text', '1');

      cy.get('#first-child-link').click();
      cy.wait(100);
      cy.get('#parent-1-counter').should('have.text', '3');
      cy.get('#first-child-counter').should('have.text', '2');
      cy.get('#second-child-title').should('have.text', 'Second Child');
      cy.get('#second-child-counter').should('have.text', '1');
    });
  });

  describe('Render page content 2 children', () => {
    before(() => {
      cy.visit('http://localhost:3000/routing-with-params-two-children');
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
