import { combineReducers } from 'redux';
import { reducerIngredients } from './ingredients';
import { reducerBurgConstructor } from './burgconstructor';
import { reducerCurrentIngredient } from './current-ingredient';
import { reducerOrder } from './order';

export const rootReducer = combineReducers({
  ingredients: reducerIngredients,
  burgConstructor: reducerBurgConstructor,
  currentIngredient: reducerCurrentIngredient,
  order: reducerOrder,
});
