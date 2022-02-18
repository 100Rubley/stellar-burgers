describe('the app is available', function () {
  it(
    'should be available on localhost:3000',
    function () {
      cy.visit('http://localhost:3000')
    }
  )

  it(
    'should open and close modal',
    function () {
      cy.get('[data-cy=ingredientContainer]').contains('Краторная булка N-200i').as('firstBun')
      cy.get('@firstBun').click();
      cy.contains('Детали ингредиента');

      cy.get('[data-cy=closeModal]').first().click();
      cy.contains('Детали ингредиента').should('not.exist');
    }
  )
}
)
