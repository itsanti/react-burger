import {
  TIngredientsActions,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';
import { IngredientProps, Sections } from '../../utils/types/prop-types';
import { reducerIngredients, initialState } from './ingredients';

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

describe('reducerIngredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducerIngredients(undefined, {} as TIngredientsActions)).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    const received = reducerIngredients(initialState, {
      type: GET_INGREDIENTS_REQUEST,
    });
    const expected = {
      ...initialState,
      isLoading: true,
    };
    expect(received).toEqual(expected);
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const received = reducerIngredients(initialState, {
      type: GET_INGREDIENTS_SUCCESS,
      payload: [ingredient],
    });
    const expected = {
      ...initialState,
      isError: false,
      isLoading: false,
      ingredients: [ingredient],
    };
    expect(received).toEqual(expected);
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const received = reducerIngredients(initialState, {
      type: GET_INGREDIENTS_FAILED,
    });
    const expected = {
      ...initialState,
      isError: true,
    };
    expect(received).toEqual(expected);
  });
});
