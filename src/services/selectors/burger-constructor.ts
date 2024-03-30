import { createSelector } from 'reselect';
import { RootState } from '../../utils/types';

const selectBurgConstructorModule = (state: RootState) => state.burgConstructor;

export const selectBurgConstructorData = (state: RootState) => selectBurgConstructorModule(state);

export const selectIngredients = (state: RootState) => selectBurgConstructorModule(state).ingredients;

export const selectBun = (state: RootState) => selectBurgConstructorModule(state).bun;

export const selectIngredientsCount = createSelector([selectBun, selectIngredients], (bun, ingredients) => {
  if (!bun) return null;
  const countersMap: { [key: string]: number } = {};
  countersMap[bun._id] = 2;
  for (let ingredient of ingredients) {
    countersMap[ingredient._id] = countersMap[ingredient._id] !== undefined ? countersMap[ingredient._id] + 1 : 1;
  }
  return countersMap;
});

export const selectTotalPrice = createSelector([selectBun, selectIngredients], (bun, ingredients) => {
  let totalPrice = 0;
  if (!bun) return totalPrice;
  totalPrice += bun.price * 2;
  totalPrice += ingredients.reduce((sum, ingredient) => (sum += ingredient.price), 0);
  return totalPrice;
});
