import { testUrl } from './constants';

describe('service is available', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

  it('should be available on localhost:3000', function () {
    cy.visit(testUrl);
  });
});
