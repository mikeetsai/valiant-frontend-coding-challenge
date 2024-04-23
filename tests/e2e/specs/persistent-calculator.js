describe('Test repayment calculation', () => {
  it('runs the app', () => {
    cy.visit('http://localhost:5173/');
    cy.url().should('eq', 'http://localhost:5173/');

    cy.get('input[data-name="loan-amount-field"]').type('30000');
    cy.get('select[data-name="loan-purpose-field"]').select('0.1');
    cy.get('select[data-name="repayment-periods-field"]').select('12');
    cy.get('select[data-name="repayment-term-months-field"]').select('24');
    cy.get('[data-name="monthly-repayment-value"]').contains('1,384');

    cy.reload();
    cy.get('[data-name="monthly-repayment-value"]').contains('1,384');
  });
});
