import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_USER_CONNECTION_SUCCESS,
  WS_CONNECTION_PROFILE_ORDERS_START,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_GET_USER_ORDERS,
} from "../../services/actions/action-types";
import { TServerOrder } from "../types/orders-types";

export interface IWsReducer {
  wsConnected: boolean;
  orders: ReadonlyArray<TServerOrder>;
  total: number;
  totalToday: number;
  userOrders: ReadonlyArray<TServerOrder>;
  wsUserConnected: boolean;
}

export type TWSPayload = {
  orders: Array<TServerOrder>;
  total: number;
  totalToday: number;
};

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionUserSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}

export interface IWsConnectionUserError {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
}

export interface IWsConnectionUserClosed {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}

export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  payload: TWSPayload;
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsProfileConnectionStart {
  readonly type: typeof WS_CONNECTION_PROFILE_ORDERS_START;
}

export interface IWsGetUserOrders {
  readonly type: typeof WS_GET_USER_ORDERS;
  payload: TWSPayload;
}

export type TWsActions =
  | IWsConnectionClosed
  | IWsConnectionError
  | IWsConnectionSuccess
  | IWsGetOrders
  | IWsConnectionStart
  | IWsProfileConnectionStart
  | IWsGetUserOrders
  | IWsConnectionUserClosed
  | IWsConnectionUserError
  | IWsConnectionUserSuccess;

export type TSMWActions = {
  wsInit?: typeof WS_CONNECTION_START;
  wsUserInit?: typeof WS_CONNECTION_PROFILE_ORDERS_START;
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_USER_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_USER_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR | typeof WS_USER_CONNECTION_ERROR;
  onMessage: typeof WS_GET_USER_ORDERS | typeof WS_GET_ORDERS;
};
