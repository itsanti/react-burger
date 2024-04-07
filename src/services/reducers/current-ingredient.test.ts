import { reducerCurrentIngredient, CurrentIngredient } from './current-ingredient';
import { IngredientProps, Sections } from '../../utils/types/prop-types';
import { TCurrentIngredientActions, SET_ACTIVE_INGREDIENT } from '../actions/current-ingredient';

const initialState: CurrentIngredient = null;

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

describe('reducerCurrentIngredient reducer', () => {
  it('should return the initial state', () => {
    expect(reducerCurrentIngredient(undefined, {} as TCurrentIngredientActions)).toEqual(null);
  });

  it('should handle SET_ACTIVE_INGREDIENT', () => {
    const received = reducerCurrentIngredient(initialState, {
      type: SET_ACTIVE_INGREDIENT,
      payload: ingredient,
    });

    expect(received).toEqual(ingredient);
  });
});
