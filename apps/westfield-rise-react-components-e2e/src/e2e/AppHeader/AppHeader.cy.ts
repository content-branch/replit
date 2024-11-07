describe('westfield-rise-react-components: AppHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appheader--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to AppHeader!');
  });
});
