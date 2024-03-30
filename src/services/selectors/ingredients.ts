import { RootState } from '../../utils/types';

const selectIngredientsModule = (state: RootState) => state.ingredients;

export const selectIngredients = (state: RootState) => selectIngredientsModule(state).ingredients;

export const selectIngredientsLoading = (state: RootState) => selectIngredientsModule(state).isLoading;

export const selectIngredientsError = (state: RootState) => selectIngredientsModule(state).isError;
