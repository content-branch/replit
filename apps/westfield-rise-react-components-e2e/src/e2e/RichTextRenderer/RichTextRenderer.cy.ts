describe('westfield-rise-react-components: RichTextRenderer component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=richtextrenderer--primary&args=document;'),
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to RichTextRenderer!');
  });
});
