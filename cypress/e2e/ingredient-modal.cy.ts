import { testUrl } from './constants';

describe('ingredient-modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredientsRequest');
  });

  it('ingredient-modal', () => {
    const ingredientName = 'Соус Spicy-X';
    const ingredientSelector = '[data-testid="ingredientModal"]';

    cy.visit(testUrl);
    cy.wait('@getIngredientsRequest');
    cy.get('[data-testid="ingredientItem"]').as('ingredientItems');
    cy.get('@ingredientItems').contains(ingredientName).click();
    cy.get(ingredientSelector).as('ingredientModal');
    cy.get('@ingredientModal').should('exist');
    cy.get('@ingredientModal').find('[class^="ingredient-details_name"]').should('have.text', ingredientName);

    cy.get('[data-testid="closeModalBtn"]').click();
    cy.get('@ingredientModal').should('not.exist');
  });
});
