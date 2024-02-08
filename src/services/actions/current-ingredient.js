export const SET_ACTIVE_INGREDIENT = 'SET_ACTIVE_INGREDIENT';

export const setIngredient = (ingredient) => {
  return {
    type: SET_ACTIVE_INGREDIENT,
    payload: ingredient,
  };
};
