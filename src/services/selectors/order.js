const selectCurrentOrderModule = (state) => state.order;

export const selectCurrentOrder = (state) => selectCurrentOrderModule(state).orderDetails?.order;
