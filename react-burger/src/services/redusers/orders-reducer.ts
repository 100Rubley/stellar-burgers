import { TOrderActions, TOrdersReducer } from "../../utils/types/orders-types";
import {
  ORDERS_REQUEST,
  ORDERS_REQUEST_ERROR,
  ORDERS_REQUEST_SUCCESS,
} from "../actions/action-types";

const initialState: TOrdersReducer = {
  list: [],
  total: 0,
  totalToday: 0,

  request: false,
  error: false,
};

export const ordersReducer = (state = initialState, action: TOrderActions): TOrdersReducer => {
  switch (action.type) {
    case ORDERS_REQUEST:
      return { ...state, error: false, request: true, ...action.payload };
    case ORDERS_REQUEST_ERROR:
      return { ...state, error: true, request: false, ...action.payload };
    case ORDERS_REQUEST_SUCCESS:
      return { ...state, error: false, request: false, ...action.payload };
    default:
      return state;
  }
};
