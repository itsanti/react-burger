import { DROP_INGREDIENT } from '../actions/burgconstructor';

const initialState = {
  bun: null,
  ingredients: [],
};

export const reducerBurgConstructor = (state = initialState, action) => {
  switch (action.type) {
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
