import { FEED_CONNECT, FEED_CONNECTING, FEED_CLOSE, FEED_MESSAGE, FEED_ERROR } from '../actions/feed';
import { TFeedActions } from '../actions/feed';
import { OrdersList, WebsocketStatus } from '../../utils/types/prop-types';

type FeedState = {
  wsStatus: WebsocketStatus;
  orders: OrdersList[];
  total: number | null;
  totalToday: number | null;
  error?: Event;
};

const initialState: FeedState = {
  wsStatus: WebsocketStatus.CLOSED,
  orders: [],
  total: null,
  totalToday: null,
};

export const feedReducer = (state = initialState, action: TFeedActions): FeedState => {
  switch (action.type) {
    case FEED_CONNECTING: {
      return {
        ...state,
        wsStatus: WebsocketStatus.CONNECTING,
      };
    }
    case FEED_CONNECT: {
      return {
        ...state,
        error: undefined,
        wsStatus: WebsocketStatus.OPEN,
      };
    }
    case FEED_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsStatus: WebsocketStatus.CLOSED,
      };
    }
    case FEED_CLOSE: {
      return { ...initialState };
    }
    case FEED_MESSAGE: {
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
