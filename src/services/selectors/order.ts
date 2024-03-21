import { RootState } from '../../utils/types';

const selectCurrentOrderModule = (state: RootState) => state.order;

export const selectCurrentOrder = (state: RootState) => selectCurrentOrderModule(state).orderDetails?.order;

export const selectOrderIsLoading = (state: RootState) => selectCurrentOrderModule(state).isLoading;
