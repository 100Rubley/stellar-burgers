import { TOrderResponce } from "../../utils/types/orders-types";
import {
  IWsConnectionClosed,
  IWsConnectionError,
  IWsConnectionStart,
  IWsConnectionSuccess,
  IWsGetMessage,
} from "../../utils/types/ws-types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "./action-types";

export const wsConnectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
});

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
});

export const wsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (orders: Array<TOrderResponce>): IWsGetMessage => ({
  type: WS_GET_MESSAGE,
  orders,
});
