import type { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/common";
import { TAppDispatch, TRootState } from "../../utils/types/types";
import { TSMWActions, TWsActions } from "../../utils/types/ws-types";

export const socketMiddleware = (
  url: string,
  wsActions: TSMWActions
): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsUserInit,
      } = wsActions;
      const token = getCookie("accessToken");

      if (type === wsInit) {
        socket = new WebSocket(`${url}/all`);
      } else if (type === wsUserInit) {
        if (token) {
          socket = new WebSocket(`${url}${"?token=" + token}`);
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
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
