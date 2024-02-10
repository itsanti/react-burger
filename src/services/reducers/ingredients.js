import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/ingredients';

const initialState = {
  ingredients: [],
  isError: false,
  isLoading: false,
};

export const reducerIngredients = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, isError: false, isLoading: false, ingredients: action.payload };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...initialState, isError: true };
    }
    default:
      return state;
  }
};
