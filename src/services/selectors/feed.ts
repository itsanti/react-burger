import { RootState } from '../../utils/types';

const selectCurrentFeedModule = (state: RootState) => state.feed;

export const selectFeedStatus = (state: RootState) => selectCurrentFeedModule(state).wsStatus;

export const selectFeedOrders = (state: RootState) => selectCurrentFeedModule(state).orders;
