import {
  PROFILE_FEED_CONNECT,
  PROFILE_FEED_CONNECTING,
  PROFILE_FEED_CLOSE,
  PROFILE_FEED_MESSAGE,
  PROFILE_FEED_ERROR,
} from '../actions/profile-feed';
import { TProfileFeedActions } from '../actions/profile-feed';
import { OrdersList, WebsocketStatus } from '../../utils/types/prop-types';

type ProfileFeedState = {
  wsStatus: WebsocketStatus;
  orders: OrdersList[];
  total: number | null;
  totalToday: number | null;
  error?: Event;
};

const initialState: ProfileFeedState = {
  wsStatus: WebsocketStatus.CLOSED,
  orders: [],
  total: null,
  totalToday: null,
};

export const profileFeedReducer = (state = initialState, action: TProfileFeedActions): ProfileFeedState => {
  switch (action.type) {
    case PROFILE_FEED_CONNECTING: {
      return {
        ...state,
        wsStatus: WebsocketStatus.CONNECTING,
      };
    }
    case PROFILE_FEED_CONNECT: {
      return {
        ...state,
        error: undefined,
        wsStatus: WebsocketStatus.OPEN,
      };
    }
    case PROFILE_FEED_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsStatus: WebsocketStatus.CLOSED,
      };
    }
    case PROFILE_FEED_CLOSE: {
      return { ...initialState };
    }
    case PROFILE_FEED_MESSAGE: {
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    default:
      return state;
  }
};
