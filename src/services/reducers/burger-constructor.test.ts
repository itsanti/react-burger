import { IngredientProps, Sections } from '../../utils/types/prop-types';
import {
  TBurgerConstructorActions,
  DROP_INGREDIENT,
  DEL_INGREDIENT,
  DEL_BUN,
  SORT_INGREDIENTS,
  CLEAR_CONSTRUCTOR,
} from '../actions/burger-constructor';
import { reducerBurgConstructor, initialState } from './burger-constructor';

const ingredient: IngredientProps & { uuid: string } = {
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
  uuid: '123',
};

describe('reducerBurgConstructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducerBurgConstructor(undefined, {} as TBurgerConstructorActions)).toEqual(initialState);
  });

  it('should handle DROP_INGREDIENT bun', () => {
    const received = reducerBurgConstructor(initialState, {
      type: DROP_INGREDIENT,
      payload: ingredient,
    });
    const expected = { ...initialState, bun: ingredient };
    expect(received).toEqual(expected);
  });

  it('should handle DROP_INGREDIENT not bun', () => {
    const notBun = { ...ingredient };
    notBun.type = Sections.sauce;

    const received = reducerBurgConstructor(initialState, {
      type: DROP_INGREDIENT,
      payload: notBun,
    });
    const expected = { ...initialState, ingredients: [notBun] };
    expect(received).toEqual(expected);
  });

  it('should handle DEL_INGREDIENT', () => {
    const state = { ...initialState };
    state.ingredients = [{ uuid: '1' }, { uuid: '23' }] as IngredientProps[];
    const received = reducerBurgConstructor(state, {
      type: DEL_INGREDIENT,
      payload: '23',
    });
    const expected = { ...state, ingredients: [{ uuid: '1' }] };
    expect(received).toEqual(expected);
  });

  it('should handle DEL_BUN', () => {
    const received = reducerBurgConstructor(initialState, {
      type: DEL_BUN,
    });
    const expected = { ...initialState, bun: null };
    expect(received).toEqual(expected);
  });

  it('should handle SORT_INGREDIENTS', () => {
    const payload = { dragIndex: 0, hoverIndex: 1 };
    initialState.ingredients = [{ _id: '1' }, { _id: '2' }] as IngredientProps[];
    const received = reducerBurgConstructor(initialState, {
      type: SORT_INGREDIENTS,
      payload,
    });
    const expected = {
      ...initialState,
      ingredients: [{ _id: '2' }, { _id: '1' }],
    };
    expect(received).toEqual(expected);
  });

  it('should handle CLEAR_CONSTRUCTOR', () => {
    const received = reducerBurgConstructor(initialState, {
      type: CLEAR_CONSTRUCTOR,
    });
    const expected = initialState;
    expect(received).toEqual(expected);
  });
});
