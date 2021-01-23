context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/simple-routing');
  });
  describe('Simple routing', () => {
    it('Should render page content', () => {
      cy.get('#simple-route-page').should('have.text', 'Simple route page');
    });
  });
  //
  // describe('Child Routing', () => {
  //   it('Parent render only once', () => {
  //     cy.get('#tab-time').then($tabTime => {
  //       cy.window().then(win => {
  //         win.history.pushState('http://localhost:3000/tab-page/static-child', 'test');
  //         cy.wait(500);
  //         cy.get('#tab-time').should('have.text', $tabTime.text());
  //       });
  //     });
  //   });
  // });
});
