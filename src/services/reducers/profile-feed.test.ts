import { initialState, profileFeedReducer } from './profile-feed';
import { WebsocketStatus, TMessage, OrderStatus } from '../../utils/types/prop-types';
import {
  TProfileFeedActions,
  PROFILE_FEED_CONNECTING,
  PROFILE_FEED_CONNECT,
  PROFILE_FEED_ERROR,
  PROFILE_FEED_CLOSE,
  PROFILE_FEED_MESSAGE,
} from '../actions/profile-feed';

describe('profileFeedReducer reducer', () => {
  it('should return the initial state', () => {
    expect(profileFeedReducer(undefined, {} as TProfileFeedActions)).toEqual(initialState);
  });

  it('should handle PROFILE_FEED_CONNECTING', () => {
    const received = profileFeedReducer(initialState, {
      type: PROFILE_FEED_CONNECTING,
      payload: 'url',
    });
    const expected = {
      ...initialState,
      wsStatus: WebsocketStatus.CONNECTING,
    };
    expect(received).toEqual(expected);
  });

  it('should handle PROFILE_FEED_CONNECT', () => {
    const received = profileFeedReducer(initialState, {
      type: PROFILE_FEED_CONNECT,
    });
    const expected = {
      ...initialState,
      error: undefined,
      wsStatus: WebsocketStatus.OPEN,
    };
    expect(received).toEqual(expected);
  });

  it('should handle PROFILE_FEED_ERROR', () => {
    const received = profileFeedReducer(initialState, {
      type: PROFILE_FEED_ERROR,
      payload: {} as Event,
    });
    const expected = {
      ...initialState,
      error: {},
      wsStatus: WebsocketStatus.CLOSED,
    };
    expect(received).toEqual(expected);
  });

  it('should handle PROFILE_FEED_CLOSE', () => {
    const received = profileFeedReducer(initialState, {
      type: PROFILE_FEED_CLOSE,
    });
    const expected = initialState;
    expect(received).toEqual(expected);
  });

  it('should handle PROFILE_FEED_MESSAGE', () => {
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
    const received = profileFeedReducer(initialState, {
      type: PROFILE_FEED_MESSAGE,
      payload: message,
    });
    const expected = {
      ...initialState,
      error: undefined,
      orders: message.orders.reverse(),
      total: message.total,
      totalToday: message.totalToday,
    };
    expect(received).toEqual(expected);
  });
});
