import { RootState } from '../../utils/types';
import { OrderStatus, OrdersList } from '../../utils/types/prop-types';

const selectCurrentProfileFeedModule = (state: RootState) => state.profileFeed;

export const selectProfileFeedStatus = (state: RootState) => selectCurrentProfileFeedModule(state).wsStatus;

export const selectProfileFeedOrders = (state: RootState) => selectCurrentProfileFeedModule(state).orders;

export const selectProfileFeedOrdersByStatus = (status: OrderStatus) => (state: RootState) => {
  return selectCurrentProfileFeedModule(state).orders.filter((order) => order.status === status);
};

export const selectProfileFeedTotal = (state: RootState) => selectCurrentProfileFeedModule(state).total;
export const selectProfileFeedTotalToday = (state: RootState) => selectCurrentProfileFeedModule(state).totalToday;

export const selectProfileOrderByNumber = (number: number) => (state: RootState) => {
  return selectCurrentProfileFeedModule(state)
    .orders.filter((order: OrdersList) => order.number === number)
    .at(0);
};
