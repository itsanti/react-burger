const selectIngredientsModule = (state) => state.ingredients;

export const selectIngredients = (state) => selectIngredientsModule(state).ingredients;

export const selectIngredientsLoading = (state) => selectIngredientsModule(state).isLoading;

export const selectIngredientsError = (state) => selectIngredientsModule(state).isError;
