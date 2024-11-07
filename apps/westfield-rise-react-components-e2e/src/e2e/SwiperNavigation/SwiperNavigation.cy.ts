describe('westfield-rise-react-components: SwiperNavigation component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=swipernavigation--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to SwiperNavigation!');
  });
});
