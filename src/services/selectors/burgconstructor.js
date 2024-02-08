const selectBurgConstructorModule = (state) => state.burgConstructor;

export const selectBurgConstructorData = (state) => selectBurgConstructorModule(state);

export const selectIngredients = (state) => selectBurgConstructorModule(state).ingredients;

export const selectBun = (state) => selectBurgConstructorModule(state).bun;
