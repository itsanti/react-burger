import { RootState } from '../../utils/types';

const selectCurrentIngredientModule = (state: RootState) => state.currentIngredient;

export const selectCurrentIngredient = (state: RootState) => selectCurrentIngredientModule(state);
