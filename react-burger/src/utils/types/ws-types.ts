import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../../services/actions/action-types";
import { TOrderResponce } from "../types/orders-types";

export interface IWsReducer {
  wsConnected: boolean;
  orders: ReadonlyArray<TOrderResponce>;
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly orders: Array<TOrderResponce>;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsConnectionError
  | IWsGetMessage;
