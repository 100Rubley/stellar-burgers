import { ORDERS_REQUEST, ORDERS_REQUEST_ERROR, ORDERS_REQUEST_SUCCESS } from "./action-types";
import {
  TOrdersRequest,
  TOrdersRequestError,
  TOrdersRequestSuccess,
  TServerOrder,
} from "../../utils/types/orders-types";
import { TAppDispatch, TAppThunk } from "../../utils/types/types";
import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/common";

export const request = (): TOrdersRequest => ({ type: ORDERS_REQUEST });
export const requestError = (): TOrdersRequestError => ({ type: ORDERS_REQUEST_ERROR });

export const setOrders = (
  orders: ReadonlyArray<TServerOrder>,
  total: number,
  totalToday: number
): TOrdersRequestSuccess => ({
  type: ORDERS_REQUEST_SUCCESS,
  payload: { list: orders, total, totalToday },
});

export const getOrders: TAppThunk = () => (dispatch: TAppDispatch) => {
  dispatch(request());
  fetch(`${BASE_URL}/orders/all`)
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch(setOrders(res.orders, res.total, res.totalToday));
      }
    })
    .catch((err) => {
      dispatch(requestError());
      console.log(err);
    });
};
