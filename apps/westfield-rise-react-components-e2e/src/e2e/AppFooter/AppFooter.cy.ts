describe('westfield-rise-react-components: AppFooter component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appfooter--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to AppFooter!');
  });
});
