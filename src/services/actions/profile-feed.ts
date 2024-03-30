import { TMessage, TwsActions } from '../../utils/types/prop-types';

export const PROFILE_FEED_CONNECT: 'PROFILE_FEED_CONNECT' = 'PROFILE_FEED_CONNECT';
export const PROFILE_FEED_DISCONNECT: 'PROFILE_FEED_DISCONNECT' = 'PROFILE_FEED_DISCONNECT';

export const PROFILE_FEED_CONNECTING: 'PROFILE_FEED_CONNECTING' = 'PROFILE_FEED_CONNECTING';
export const PROFILE_FEED_CLOSE: 'PROFILE_FEED_CLOSE' = 'PROFILE_FEED_CLOSE';
export const PROFILE_WS_FEED_CLOSE: 'PROFILE_WS_FEED_CLOSE' = 'PROFILE_WS_FEED_CLOSE';
export const PROFILE_FEED_MESSAGE: 'PROFILE_FEED_MESSAGE' = 'PROFILE_FEED_MESSAGE';
export const PROFILE_FEED_ERROR: 'PROFILE_FEED_ERROR' = 'PROFILE_FEED_ERROR';

export const feedProfileStoreActions: TwsActions = {
  wsInit: PROFILE_FEED_CONNECTING,
  onOpen: PROFILE_FEED_CONNECT,
  onMessage: PROFILE_FEED_MESSAGE,
  wsClose: PROFILE_WS_FEED_CLOSE,
  onError: PROFILE_FEED_ERROR,
  onClose: PROFILE_FEED_CLOSE,
};

export interface IProfileFeedConnectingAction {
  readonly type: typeof PROFILE_FEED_CONNECTING;
  readonly payload: string;
}

export const profileFeedConnect = (url: string): IProfileFeedConnectingAction => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    type: PROFILE_FEED_CONNECTING,
    payload: `${url}?token=${accessToken?.split(' ').pop()}`,
  };
};

export interface IProfileFeedConnectAction {
  readonly type: typeof PROFILE_FEED_CONNECT;
}

export interface IProfileFeedMessageAction {
  readonly type: typeof PROFILE_FEED_MESSAGE;
  readonly payload: TMessage;
}

export interface IProfileFeedCloseAction {
  readonly type: typeof PROFILE_FEED_CLOSE;
}

export interface IProfileWsFeedCloseAction {
  readonly type: typeof PROFILE_WS_FEED_CLOSE;
}

export interface IProfileFeedErrorAction {
  readonly type: typeof PROFILE_FEED_ERROR;
  readonly payload: Event;
}

export type TProfileFeedActions =
  | IProfileFeedConnectAction
  | IProfileFeedConnectingAction
  | IProfileFeedMessageAction
  | IProfileFeedCloseAction
  | IProfileFeedErrorAction
  | IProfileWsFeedCloseAction;
