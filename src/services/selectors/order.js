const selectCurrentOrderModule = (state) => state.order;

export const selectCurrentOrder = (state) => selectCurrentOrderModule(state).orderDetails?.order;

export const selectOrderIsLoading = (state) => selectCurrentOrderModule(state).isLoading;
