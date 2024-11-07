describe('westfield-rise-react-components: CaseStudyCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=casestudycard--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to CaseStudyCard!');
  });
});
