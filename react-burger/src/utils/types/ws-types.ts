import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../../services/actions/action-types";
import { TServerOrder } from "../types/orders-types";

export interface IWsReducer {
  wsConnected: boolean;
  orders: ReadonlyArray<TServerOrder>;
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

export interface IwsOrders {
  orders: ReadonlyArray<TServerOrder>;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly orders: IwsOrders;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsConnectionError
  | IWsGetMessage;
