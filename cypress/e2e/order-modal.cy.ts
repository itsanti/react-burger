import { testUrl } from './constants';

function moveIngredient(draggableSelector: string, dropSelector: string) {
  cy.get(`@${draggableSelector}`).trigger('dragstart');
  cy.get(`@${dropSelector}`).trigger('drop');
}

describe('order-modal', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredientsRequest');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrderRequest');
    window.localStorage.setItem('refreshToken', 'test-refreshToken');
    window.localStorage.setItem('accessToken', 'test-accessToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('order-modal', () => {
    const ingredientsSelector = '[data-testid="ingredientItem"]';
    const counterSelector = '.counter__num';
    const orderModalSelector = '[data-testid="orderModal"]';

    cy.visit(testUrl);
    cy.wait('@getIngredientsRequest');
    cy.get(ingredientsSelector).first().as('bun');
    cy.get('[class^="burger-constructor_dropArea"]').as('dropAreaEmpty');
    moveIngredient('bun', 'dropAreaEmpty');
    cy.get('@dropAreaEmpty').should('not.exist');

    cy.get('[class^="burger-constructor_root"]').as('dropAreaFilled');
    cy.get(ingredientsSelector).eq(2).as('spaceSauce1');
    moveIngredient('spaceSauce1', 'dropAreaFilled');
    cy.get(ingredientsSelector).eq(3).as('spaceSauce2');
    moveIngredient('spaceSauce2', 'dropAreaFilled');

    cy.get('@bun').find(counterSelector).should('have.text', '2');
    cy.get('@spaceSauce1').find(counterSelector).should('have.text', '1');
    cy.get('@spaceSauce1').find(counterSelector).should('have.text', '1');

    cy.get('@dropAreaFilled').contains('Краторная булка N-200i (верх)');
    cy.get('@dropAreaFilled').contains('Соус Spicy-X');
    cy.get('@dropAreaFilled').contains('Соус фирменный Space Sauce');
    cy.get('@dropAreaFilled').contains('Краторная булка N-200i (низ)');

    cy.get('.button_type_primary').as('orderButton').click();
    cy.wait('@postOrderRequest');

    cy.get(orderModalSelector).should('exist');
    cy.get('[data-testid="order-number"]').contains('123').should('exist');
    cy.get('[data-testid="closeModalBtn"]').click();
    cy.get(orderModalSelector).should('not.exist');
  });
});
