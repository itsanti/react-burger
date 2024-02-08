import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/ingredients';

const initialState = [];

export const reducerIngredients = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
