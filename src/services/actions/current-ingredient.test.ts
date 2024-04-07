import { setIngredient, SET_ACTIVE_INGREDIENT } from './current-ingredient';
import { IngredientProps, Sections } from '../../utils/types/prop-types';

describe('current-ingredient actions', () => {
  it('should create an action with correct ingredient', () => {
    const ingredient: IngredientProps = {
      _id: '11',
      calories: 2,
      carbohydrates: 2,
      fat: 2,
      image: 'path',
      image_large: 'path',
      image_mobile: 'path',
      name: 'burger',
      price: 23,
      proteins: 2,
      type: Sections.bun,
    };
    const expectedAction = {
      type: SET_ACTIVE_INGREDIENT,
      payload: ingredient,
    };
    expect(setIngredient(ingredient)).toEqual(expectedAction);
  });
});
