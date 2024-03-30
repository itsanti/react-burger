import type { Middleware } from 'redux';
import { RootState } from '../../utils/types';
import { TwsActions } from '../../utils/types/prop-types';
import { refreshToken } from '../actions/auth';

export const socketMiddleware = (
    wsActions: TwsActions,
    withTokenRefresh: boolean
): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url: string | null = null;
        const {
            wsInit,
            wsClose,
            wsSendMessage,
            onOpen,
            onClose,
            onError,
            onMessage,
        } = wsActions;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type } = action;

            if (type === wsInit) {
                socket = new WebSocket(action.payload);
                url = action.payload;

                socket.onopen = (event) => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                        refreshToken().then((refreshData) => {
                            const wssUrl = new URL(url!);
                            wssUrl.searchParams.set(
                                "token",
                                refreshData.accessToken.replace("Bearer ", "")
                            );
                            dispatch({ type: wsInit, payload: wssUrl });
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        dispatch({
                            type: onMessage,
                            payload: parsedData
                        });
                    }
                };

                socket.onclose = (event) => {
                    dispatch({ type: onClose });
                    socket = null;
                };
            }

            if (wsClose && type === wsClose && socket) {
                socket.close();
            }

            if (wsSendMessage && type === wsSendMessage && socket) {
                socket.send(JSON.stringify(action.payload));
            }

            next(action);
        };
    };
};