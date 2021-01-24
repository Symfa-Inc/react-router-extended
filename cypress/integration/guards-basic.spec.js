context('Guards', () => {
  describe('Guards basic', () => {
    // before(() => {
    //   cy.visit('http://localhost:3000/simple-routing');
    // });

    it('Guards should work consistently and child renders only once and parent renders once', () => {
      cy.visit('http://localhost:3000/guards-consistency-work').then(() => {
        cy.get('#parent-title').should('have.text', 'Parent Title');
        cy.get('#parent-counter').should('have.text', '1');
        cy.get('#insert-place').should('be.empty');

        cy.get('#parent-link').click();
        cy.wait(1000);

        cy.get('#insert-place').should(
          'have.text',
          'first message | second message | third message | child rendered once!',
        );
        cy.get('#parent-counter').should('have.text', '2');
      });
    });

    it('Should not render parent component while guards are working', () => {
      cy.visit('http://localhost:3000/guards-consistency-work').then(() => {
        cy.get('#parent-title').should('have.text', 'Parent Title');
        cy.get('#parent-counter').should('have.text', '1');
        cy.get('#insert-place').should('be.empty');

        cy.get('#parent-link').click();
        cy.wait(1);
        cy.get('#child-title').should('not.exist');
        cy.wait(1000);
        cy.get('#child-title').should('exist');
      });
    });

    it('Should not call other guard if first guard has failed and should not render child path', () => {
      cy.visit('http://localhost:3000/guards-check-failed').then(() => {
        cy.get('#parent-title').should('have.text', 'Parent Title');
        cy.get('#parent-counter').should('have.text', '1');
        cy.get('#insert-place').should('be.empty');

        cy.get('#parent-link').click();

        cy.wait(1000);
        cy.get('#parent-counter').should('have.text', '2');
        cy.get('#child-title').should('not.exist');
        cy.get('#insert-place').should('have.text', 'first message | ');
      });
    });

    it('Should redirect if at least one guard has failed', () => {
      cy.visit('http://localhost:3000/guards-check-failed-with-redirect').then(() => {
        cy.get('#parent-title').should('have.text', 'Parent Title');
        cy.get('#parent-counter').should('have.text', '1');
        cy.get('#insert-place').should('be.empty');

        cy.get('#parent-link').click();
        cy.wait(10);
        cy.get('#parent-counter').should('have.text', '2');

        cy.wait(500);
        cy.get('#child-title').should('not.exist');

        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/login');
        });
        cy.get('#login-page-title').should('have.text', 'Login page!');
      });
    });
  });
});
