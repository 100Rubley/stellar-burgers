import {
  IWsConnectionClosed,
  IWsConnectionError,
  IWsConnectionStart,
  IWsConnectionSuccess,
  IWsConnectionUserClosed,
  IWsGetOrders,
  IWsGetUserOrders,
  IWsProfileConnectionStart,
  TWSPayload,
} from "../../utils/types/ws-types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_PROFILE_ORDERS_START,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_GET_USER_ORDERS,
  WS_USER_CONNECTION_CLOSED,
} from "./action-types";

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS
});

export const wsConnectionError = (): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR
})

export const wsConnectionClosed = (): IWsConnectionClosed  => ({
  type: WS_CONNECTION_CLOSED
})

export const wsGetOrders = (payload: TWSPayload): IWsGetOrders => ({
  type: WS_GET_ORDERS,
  payload
})

export const wsConnectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START
})

export const wsProfileConnectionStart = (): IWsProfileConnectionStart => ({
  type: WS_CONNECTION_PROFILE_ORDERS_START
})

export const wsGetUserOrders = (payload: TWSPayload): IWsGetUserOrders => ({
  type: WS_GET_USER_ORDERS,
  payload
})

export const wsUserConnectionClosed = (): IWsConnectionUserClosed => ({
  type: WS_USER_CONNECTION_CLOSED
})
