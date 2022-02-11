import {
  ORDERS_REQUEST,
  ORDERS_REQUEST_ERROR,
  ORDERS_REQUEST_SUCCESS,
} from "../../services/actions/action-types";
import { IIngredient } from "./types";

export type TOrderStatus = "done" | "created" | "cancelled" | "pending";

// этот интерфэйс нужен для типизации заказа, который будет отрисовываться
export interface IOrder {
  id: number;
  createdAt: string;
  fullname: string;
  status: TOrderStatus;
  ingredients: ReadonlyArray<IIngredient>;
}
// _______________________________________________________________________

export type TServerOrder = {
  ingredients: ReadonlyArray<string>;
  _id: string;
  status: TOrderStatus;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TOrderResponce = {
  orders: ReadonlyArray<TServerOrder>;
  total: number;
  totalToday: number;
};

export type TOrdersReducer = {
  list: ReadonlyArray<TServerOrder>;
  total: number;
  totalToday: number;
  request: boolean;
  error: boolean;
};

type TPayload = {
  [name: string]: ReadonlyArray<TServerOrder> | boolean | number;
};

export type TOrdersRequest = {
  type: typeof ORDERS_REQUEST;
  payload?: TPayload;
};

export type TOrdersRequestError = {
  type: typeof ORDERS_REQUEST_ERROR;
  payload?: TPayload;
};

export type TOrdersRequestSuccess = {
  type: typeof ORDERS_REQUEST_SUCCESS;
  payload?: TPayload;
};

export type TOrderActions = TOrdersRequest | TOrdersRequestError | TOrdersRequestSuccess;
