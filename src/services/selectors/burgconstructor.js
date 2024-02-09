const selectBurgConstructorModule = (state) => state.burgConstructor;

export const selectBurgConstructorData = (state) => selectBurgConstructorModule(state);

export const selectIngredients = (state) => selectBurgConstructorModule(state).ingredients;

export const selectBun = (state) => selectBurgConstructorModule(state).bun;

export const selectIngredientsCount = (state) => {
  // const items = selectBurgConstructorData(state);
  const countersMap = {};
  countersMap[selectBun(state)._id] = 2;
  for (let ingredient of selectIngredients(state)) {
    countersMap[ingredient._id] = countersMap[ingredient._id] !== undefined ? countersMap[ingredient._id] + 1 : 1;
  }
  return countersMap;
};
