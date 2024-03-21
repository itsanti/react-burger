import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../../index';
import { TCurrentIngredientActions } from '../../services/actions/current-ingredient';
import { TOrderActions } from '../../services/actions/order';
import { TIngredientsActions } from '../../services/actions/ingredients';

type TApplicationActions = TIngredientsActions | TCurrentIngredientActions | TOrderActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
