import type { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/common";
import { TAppDispatch, TRootState } from "../../utils/types/types";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from "../actions/ws-actions";

type wsActions = {
  WS_CONNECTION_START: string;
  WS_CONNECTION_CLOSED: string;
  WS_CONNECTION_SUCCESS: string;
  WS_CONNECTION_ERROR: string;
  WS_GET_MESSAGE: string;
};

export const socketMiddleware = (url: string, actions: wsActions): Middleware => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    const {
      WS_CONNECTION_START,
    } = actions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const token = getCookie("accessToken");

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${url}${"?token=" + token}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsConnectionSuccess());
        };

        socket.onerror = (event) => {
          dispatch(wsConnectionError());
        };

        socket.onclose = (event) => {
          dispatch(wsConnectionClosed());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(wsGetMessage(restParsedData));
        };
      }

      next(action)
    };
  };
};
