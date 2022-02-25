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
      cy.get('@dropTarget').contains('Краторная булка N-200i')

      cy.get('[data-cy=ingredientContainer]').contains('Соус Spicy-X').as('sauce')

      cy.get('@sauce').trigger('dragstart')
      cy.get('@dropTarget').trigger('drop')
      cy.get('@dropTarget').contains('Соус Spicy-X')
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
      cy.get('button')
        .contains('Войти')
        .click()
        .wait(500)
        .getCookie("accessToken").should('not.be.empty') // <-- проверку на залогинивание делаю через наличие кук
        .getCookie("refreshToken").should('not.be.empty')// <-- проверку на залогинивание делаю через наличие кук
        .get("body").should("contain", "Соберите бургер");// <-- после входа редирект на главную
    }
  )

  it(
    'should click order btn and get order number',
    function () {
      cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' })

      cy.get('[data-cy=ingredientContainer]').contains('Краторная булка N-200i').as('bun')
      cy.get('[data-cy=dropTarget]').first().as('dropTarget')

      cy.get('@bun').trigger('dragstart')
      cy.get('@dropTarget').trigger('drop')

      cy.get('[data-cy=ingredientContainer]').contains('Соус Spicy-X').as('sauce')

      cy.get('@sauce').trigger('dragstart')
      cy.get('@dropTarget').trigger('drop')

      cy.get('button').contains("Оформить заказ").click().wait(1000)
      cy.get('[data-cy="orderNumber"]').should('contain', 1)
    }
  )

  it(
    'should close order modal',
    function () {
      cy.get('[data-cy=closeModal]').first().click();
      cy.contains('Идентификатор заказа').should('not.exist');
    }
  )
}
)
