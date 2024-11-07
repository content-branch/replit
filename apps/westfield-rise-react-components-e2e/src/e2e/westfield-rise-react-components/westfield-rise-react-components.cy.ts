describe('westfield-rise-react-components: WestfieldRiseReactComponents component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=westfieldrisereactcomponents--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to WestfieldRiseReactComponents!');
  });
});
