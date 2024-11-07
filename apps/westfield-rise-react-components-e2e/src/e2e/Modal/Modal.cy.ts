describe('westfield-rise-react-components: Modal component', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=modal--primary&args=children;isOpen:false;toggle;',
    ),
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Modal!');
  });
});
