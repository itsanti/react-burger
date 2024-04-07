import { TFeedActions, FEED_CONNECT, FEED_CONNECTING, FEED_CLOSE, FEED_MESSAGE, FEED_ERROR } from '../actions/feed';
import { OrderStatus, TMessage, WebsocketStatus } from '../../utils/types/prop-types';
import { feedReducer, initialState } from './feed';

describe('feedReducer reducer', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, {} as TFeedActions)).toEqual(initialState);
  });

  it('should handle FEED_CONNECT', () => {
    const received = feedReducer(initialState, {
      type: FEED_CONNECT,
    });
    const expected = {
      ...initialState,
      error: undefined,
      wsStatus: WebsocketStatus.OPEN,
    };
    expect(received).toEqual(expected);
  });

  it('should handle FEED_CONNECTING', () => {
    const received = feedReducer(initialState, {
      type: FEED_CONNECTING,
      payload: 'url',
    });
    const expected = {
      ...initialState,
      wsStatus: WebsocketStatus.CONNECTING,
    };
    expect(received).toEqual(expected);
  });

  it('should handle FEED_CLOSE', () => {
    const received = feedReducer(initialState, {
      type: FEED_CLOSE,
    });
    const expected = initialState;
    expect(received).toEqual(expected);
  });

  it('should handle FEED_ERROR', () => {
    const received = feedReducer(initialState, {
      type: FEED_ERROR,
      payload: {} as Event,
    });
    const expected = {
      ...initialState,
      error: {},
      wsStatus: WebsocketStatus.CLOSED,
    };
    expect(received).toEqual(expected);
  });

  it('should handle FEED_MESSAGE', () => {
    const message: TMessage = {
      success: true,
      orders: [
        {
          _id: '22323',
          createdAt: '',
          updatedAt: '',
          ingredients: [],
          name: '',
          number: 2323,
          status: OrderStatus.created,
        },
      ],
      total: 2,
      totalToday: 10,
    };
    const received = feedReducer(initialState, {
      type: FEED_MESSAGE,
      payload: message,
    });
    const expected = {
      ...initialState,
      error: undefined,
      orders: message.orders,
      total: message.total,
      totalToday: message.totalToday,
    };
    expect(received).toEqual(expected);
  });
});
