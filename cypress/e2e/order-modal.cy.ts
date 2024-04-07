describe('order-modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

    // Устанавливаем токены:
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    window.localStorage.setItem('accessToken', 'test-accessToken');
  });

  // Проверяем, что на странице в модальном окне отображается нужный номер заказа
  // Номер заказа моковый из файла fixtures/order.json
  // Селектор по атрибуту data-testid
  cy.get('[data-testid=order-number]').contains('123').should('exist');
});
