import { RootState } from '../../utils/types';
import { OrderStatus, OrdersList } from '../../utils/types/prop-types';

const selectCurrentFeedModule = (state: RootState) => state.feed;

export const selectFeedStatus = (state: RootState) => selectCurrentFeedModule(state).wsStatus;

export const selectFeedOrders = (state: RootState) => selectCurrentFeedModule(state).orders;

export const selectFeedOrdersByStatus = (status: OrderStatus) => (state: RootState) => {
  return selectCurrentFeedModule(state).orders.filter((order) => order.status === status);
};

export const selectFeedTotal = (state: RootState) => selectCurrentFeedModule(state).total;
export const selectFeedTotalToday = (state: RootState) => selectCurrentFeedModule(state).totalToday;

export const selectOrderByNumber = (number: number) => (state: RootState) => {
  return selectCurrentFeedModule(state)
    .orders.filter((order: OrdersList) => order.number === number)
    .at(0);
};
