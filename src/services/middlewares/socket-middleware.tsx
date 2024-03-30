import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../../utils/types';
import { TFeedStoreActions, TFeedActions } from '../actions/feed';


export const socketMiddleware = (wsActions: TFeedStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TFeedActions) => {
            const { dispatch } = store;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
            if (action.type === wsInit) {
                const url = action.payload;
                socket = new WebSocket(url);

                socket.onopen = (event) => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onclose = (event) => {
                    // TODO: reconnect
                    dispatch({ type: onClose });
                    socket && socket.close();
                    socket = null;
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: onMessage, payload: parsedData });
                };
            }

            next(action);
        };
    }) as Middleware;
};