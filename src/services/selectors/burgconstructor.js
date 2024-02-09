const selectBurgConstructorModule = (state) => state.burgConstructor;

export const selectBurgConstructorData = (state) => selectBurgConstructorModule(state);

export const selectIngredients = (state) => selectBurgConstructorModule(state).ingredients;

export const selectBun = (state) => selectBurgConstructorModule(state).bun;

export const selectIngredientsCount = (state) => {
  if (!selectBun(state)) {
    return null;
  }
  const countersMap = {};
  countersMap[selectBun(state)._id] = 2;
  for (let ingredient of selectIngredients(state)) {
    countersMap[ingredient._id] = countersMap[ingredient._id] !== undefined ? countersMap[ingredient._id] + 1 : 1;
  }
  return countersMap;
};

export const selectTotalPrice = (state) => {
  let totalPrice = 0;
  if (!selectBun(state)) {
    return totalPrice;
  }

  totalPrice += selectBun(state).price * 2;
  totalPrice += selectIngredients(state).reduce((sum, ingredient) => (sum += ingredient.price), 0);
  return totalPrice;
};
