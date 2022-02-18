describe('order request ability', function () {
  before(
    function () {
      cy.visit('http://localhost:3000')
    }
  )


  it(
    'should DnD bun and sauce to constructor',
    function () {
      cy.get('[data-cy=ingredientContainer]').contains('Краторная булка N-200i').as('bun')
      cy.get('[data-cy=dropTarget]').first().as('dropTarget')

      cy.get('@bun').trigger('dragstart')
      cy.get('@dropTarget').trigger('drop')

      cy.get('[data-cy=ingredientContainer]').contains('Соус Spicy-X').as('sauce')

      cy.get('@sauce').trigger('dragstart')
      cy.get('@dropTarget').trigger('drop')
    }
  )

  it(
    'should try to post order',
    function () {
      cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' })
      cy.get('button').contains("Оформить заказ").click();
    }
  )

  it(
    'should log in',
    function () {
      cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', { fixture: 'login.json' })
      cy.visit('http://localhost:3000/login');
      cy.get('[data-cy=login_emailInput]').click();
      cy.get('[name=email]').type('test@mail.com');
      cy.get('[name=password]').type('Vovka1337');
      cy.get('button').contains('Войти').click();
    }
  )
}
)
