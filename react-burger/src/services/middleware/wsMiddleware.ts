import type { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/common";
import type {
  TApplicationActions,
  TAppDispatch,
  TRootState,
} from "../../utils/types/types";
import { WS_CONNECTION_START } from "../actions/action-types";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from "../actions/ws-actions";
import { store } from "../redusers";

type wsActions = {
  WS_CONNECTION_START: string;
  WS_CONNECTION_CLOSED: string;
  WS_CONNECTION_SUCCESS: string;
  WS_CONNECTION_ERROR: string;
  WS_GET_MESSAGE: string;
};

export const websocket = (url: string, actions: wsActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    const {
      WS_CONNECTION_START,
      WS_CONNECTION_CLOSED,
      WS_CONNECTION_SUCCESS,
      WS_CONNECTION_ERROR,
      WS_GET_MESSAGE,
    } = actions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const token = getCookie("accessToken");

      if (type === WS_CONNECTION_START) {
        // надо проверить в accessToken сидит Bearer, если нет, то отсавить, если да, то обрезать
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
