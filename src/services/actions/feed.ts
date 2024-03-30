import { TMessage, TwsActions } from '../../utils/types/prop-types';

export const FEED_CONNECT: 'FEED_CONNECT' = 'FEED_CONNECT';
export const FEED_DISCONNECT: 'FEED_DISCONNECT' = 'FEED_DISCONNECT';

export const FEED_CONNECTING: 'FEED_CONNECTING' = 'FEED_CONNECTING';
export const FEED_CLOSE: 'FEED_CLOSE' = 'FEED_CLOSE';
export const FEED_WS_CLOSE: 'FEED_WS_CLOSE' = 'FEED_WS_CLOSE';
export const FEED_MESSAGE: 'FEED_MESSAGE' = 'FEED_MESSAGE';
export const FEED_ERROR: 'FEED_ERROR' = 'FEED_ERROR';

export const feedStoreActions: TwsActions = {
  wsInit: FEED_CONNECTING,
  onOpen: FEED_CONNECT,
  onMessage: FEED_MESSAGE,
  wsClose: FEED_WS_CLOSE,
  onError: FEED_ERROR,
  onClose: FEED_CLOSE,
};

export interface IFeedConnectingAction {
  readonly type: typeof FEED_CONNECTING;
  readonly payload: string;
}

export const feedConnect = (url: string): IFeedConnectingAction => {
  return {
    type: FEED_CONNECTING,
    payload: url,
  };
};

export interface IFeedConnectAction {
  readonly type: typeof FEED_CONNECT;
}

export interface IFeedMessageAction {
  readonly type: typeof FEED_MESSAGE;
  readonly payload: TMessage;
}

export interface IFeedCloseAction {
  readonly type: typeof FEED_CLOSE;
}

export interface IFeedWSCloseAction {
  readonly type: typeof FEED_WS_CLOSE;
}

export interface IFeedErrorAction {
  readonly type: typeof FEED_ERROR;
  readonly payload: Event;
}

export type TFeedActions =
  | IFeedConnectAction
  | IFeedConnectingAction
  | IFeedMessageAction
  | IFeedCloseAction
  | IFeedErrorAction
  | IFeedWSCloseAction;
