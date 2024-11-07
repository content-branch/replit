describe('westfield-rise-react-components: DefaultLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=defaultlayout--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to DefaultLayout!');
  });
});
