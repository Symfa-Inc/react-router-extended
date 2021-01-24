context('Resolvers', () => {
  describe('Resolver basic', () => {
    it('Should not render route with resolver until they will be resolved and route should be able to accept resolver into', () => {
      cy.visit('http://localhost:3000/page-with-resolvers').then(() => {
        cy.get('#page-title').should('not.exist');
        cy.wait(1000);

        cy.get('#page-title').should('have.text', 'Page with resolvers');

        cy.get('#first-resolver-name').should('have.text', 'Joy');
        cy.get('#first-resolver-last-name').should('have.text', 'Doy');
        cy.get('#second-resolver-color').should('have.text', 'blue');
      });
    });

    it('Resolvers should be checked only for direct route and not for children', () => {
      cy.visit('http://localhost:3000/resolver-smart-check').then(() => {
        cy.get('#parent-1-title').should('have.text', 'Parent Title');
        cy.get('#parent-1-counter').should('have.text', '1');
        cy.get('#insert-place').should('be.empty');

        cy.get('#parent-1-link').click();
        cy.wait(200);

        cy.get('#parent-1-counter').should('have.text', '2');
        cy.get('#parent-2-title').should('have.text', 'Parent With Resolvers Title');

        cy.get('#parent-2-first-resolver').then(firstResolverElement => {
          cy.get('#parent-2-second-resolver').then(secondResolverElement => {
            const firstResolverText = firstResolverElement.text();
            const secondResolverText = secondResolverElement.text();
            cy.get('#parent-2-link-1').click();
            cy.wait(50);

            cy.get('#parent-1-counter').should('have.text', '3');
            cy.get('#parent-2-first-resolver').should('have.text', firstResolverText);
            cy.get('#parent-2-second-resolver').should('have.text', secondResolverText);
            cy.get('#insert-place').should('have.text', 'child rendered once!');
            cy.get('#child-1-title').should('exist');
            cy.get('#child-2-title').should('not.exist');

            cy.get('#parent-2-link-2').click();
            cy.wait(50);
            cy.get('#parent-1-counter').should('have.text', '4');
            cy.get('#parent-2-first-resolver').should('have.text', firstResolverText);
            cy.get('#parent-2-second-resolver').should('have.text', secondResolverText);
            cy.get('#insert-place').should('have.text', 'child rendered once!child rendered once!');

            cy.get('#child-1-title').should('not.exist');
            cy.get('#child-2-title').should('exist');

            cy.get('#child-2-link').click();
            cy.wait(50);
            cy.get('#insert-place').should('have.text', 'child rendered once!child rendered once!');
            cy.get('#parent-1-counter').should('have.text', '5');
            cy.get('#parent-2-link-2').should('not.exist');
            cy.get('#child-1-title').should('not.exist');
            cy.get('#child-2-title').should('not.exist');

            cy.get('#parent-1-link').click();
            cy.wait(200);

            cy.get('#parent-2-first-resolver').should('not.have.text', firstResolverText);
            cy.get('#parent-2-second-resolver').should('not.have.text', secondResolverText);
            cy.get('#parent-1-counter').should('have.text', '6');
            cy.get('#insert-place').should('have.text', 'child rendered once!child rendered once!');
          });
        });
        // cy.get('#insert-place').should('have.text', 'first message | ');
        // cy.get('#parent-1-counter').should('have.text', '2');

        // cy.get('#parent-2-link-1').click();
      });
    });

    it('Direct link should activate resolvers and render all components only once', () => {
      cy.visit('http://localhost:3000/resolver-smart-check/parent-with-resolvers/child-1').then(() => {
        cy.get('#parent-1-title').should('have.text', 'Parent Title');
        cy.get('#parent-1-counter').should('have.text', '1');
        cy.get('#parent-2-counter').should('have.text', '1');
        cy.get('#parent-2-counter').should('have.text', '1');

        cy.get('#parent-2-first-resolver').should('exist');
        cy.get('#parent-2-second-resolver').should('exist');

        cy.get('#insert-place').should('have.text', 'child rendered once!');
        cy.get('#child-1-title').should('have.text', 'Child title');
      });
    });
  });
});
