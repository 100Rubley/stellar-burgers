import { IWsReducer, TWsActions } from "../../utils/types/ws-types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_GET_USER_ORDERS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_SUCCESS,
} from "../actions/action-types";

const initialState: IWsReducer = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  userOrders: [],
  wsUserConnected: false,
};

export const wsReducer = (
  state = initialState,
  action: TWsActions
): IWsReducer => {
  switch (action.type) {
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: action.payload.orders,
      };

    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload.orders,
      };
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsUserConnected: true,
      };
    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsUserConnected: false,
      };
    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsUserConnected: false,
      };

    default:
      return state;
  }
};
