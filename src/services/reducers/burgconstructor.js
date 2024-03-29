import {
  DROP_INGREDIENT,
  DEL_INGREDIENT,
  DEL_BUN,
  SORT_INGREDIENTS,
  CLEAR_CONSTRUCTOR,
} from '../actions/burgconstructor';
import { swapElements } from '../../utils/utils';

const initialState = {
  bun: null,
  ingredients: [],
};

export const reducerBurgConstructor = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CONSTRUCTOR:
      return initialState;
    case SORT_INGREDIENTS:
      const swaped = swapElements(state.ingredients, action.payload.dragIndex, action.payload.hoverIndex);
      return { ...state, ingredients: swaped };
    case DEL_BUN:
      return { ...state, bun: null };
    case DEL_INGREDIENT:
      return { ...state, ingredients: state.ingredients.filter((ingredient) => ingredient.uuid !== action.payload) };
    case DROP_INGREDIENT:
      const newState = { ...state };
      if (action.payload.type === 'bun') {
        newState.bun = action.payload;
      } else {
        newState.ingredients = [...newState.ingredients, action.payload];
      }
      return newState;
    default:
      return state;
  }
};
