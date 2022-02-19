describe('modal fuctioning', function () {
  it(
    'should be available on localhost:3000',
    function () {
      cy.visit('http://localhost:3000')
    }
  )

  it(
    'should open modal and show details',
    function () {
      cy.get('[data-cy=ingredientContainer]').contains('Краторная булка N-200i').as('firstBun')
      cy.get('@firstBun').click();
      cy.contains('Детали ингредиента');
    }
  )

  it(
    'modal should display ingredients details',
    function () {
      cy.get('[data-cy=modal-ingredientCalories]').contains('420')
    }
  )

  it(
    'should close modal',
    function () {
      cy.get('[data-cy=closeModal]').first().click();
      cy.contains('Детали ингредиента').should('not.exist');
    }
  )
}
)
