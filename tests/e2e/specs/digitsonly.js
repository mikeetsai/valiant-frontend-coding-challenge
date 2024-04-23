describe('Test digits only', () => {
  it('test digits only', () => {
    cy.visit('http://localhost:5173/');
    cy.url().should('eq', 'http://localhost:5173/');

    cy.get('input[data-name="loan-amount-field"]').type('abc');
    cy.get('input[data-name="loan-amount-field"]').should('have.value', '');
  });
});
