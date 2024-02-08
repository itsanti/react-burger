import { SET_ACTIVE_INGREDIENT } from '../actions/current-ingredient';

const initialState = null;

export const reducerCurrentIngredient = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_INGREDIENT:
      return action.payload;
    default:
      return state;
  }
};
