import { REQUEST, REQUEST_ERROR, REQUEST_SUCCESS } from "./action-types";
import {
  TRequest,
  TRequestError,
  TRequestSuccess,
  TServerOrder,
} from "../../utils/types/orders-types";
import { TAppDispatch, TAppThunk } from "../../utils/types/types";
import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/common";

export const request = (): TRequest => ({ type: REQUEST });
export const requestError = (): TRequestError => ({ type: REQUEST_ERROR });

export const setOrders = (
  orders: ReadonlyArray<TServerOrder>,
  total: number,
  totalToday: number
): TRequestSuccess => ({
  type: REQUEST_SUCCESS,
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
