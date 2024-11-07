describe('westfield-rise-react-components: environmentContextDecorator component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=environmentcontextdecorator--primary'),
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to environmentContextDecorator!');
  });
});
